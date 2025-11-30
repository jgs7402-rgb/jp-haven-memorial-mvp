// app/api/admin/cemetery-images/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/src/lib/supabase/server';

type SaveCemeteryImagesPayload = {
  cemeteryId: number;
  images: {
    imageUrl: string;
    sortOrder: number | null;
    isMain: boolean;
  }[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SaveCemeteryImagesPayload;
    const { cemeteryId, images } = body;

    if (!cemeteryId) {
      return NextResponse.json(
        { ok: false, error: 'cemeteryId is required' },
        { status: 400 },
      );
    }

    // 1) 기존 이미지 모두 삭제
    const { error: delError } = await supabaseServer
      .from('cemetery_image')
      .delete()
      .eq('cemetery_id', cemeteryId);

    if (delError) {
      console.error('[api/admin/cemetery-images] delete error =', delError);
      return NextResponse.json(
        { ok: false, error: delError.message },
        { status: 500 },
      );
    }

    // 2) 새 이미지들만 삽입 (URL 비어 있는 건 무시)
    const validImages = (images ?? []).filter(
      (img) => img.imageUrl && img.imageUrl.trim() !== '',
    );

    if (validImages.length > 0) {
      const { error: insError } = await supabaseServer
        .from('cemetery_image')
        .insert(
          validImages.map((img) => ({
            cemetery_id: cemeteryId,
            image_url: img.imageUrl.trim(),
            sort_order: img.sortOrder,
            is_main: img.isMain,
          })),
        );

      if (insError) {
        console.error('[api/admin/cemetery-images] insert error =', insError);
        return NextResponse.json(
          { ok: false, error: insError.message },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[api/admin/cemetery-images] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}
