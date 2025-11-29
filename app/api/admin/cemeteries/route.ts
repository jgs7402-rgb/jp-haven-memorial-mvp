// app/api/admin/cemeteries/route.ts
import { NextResponse } from 'next/server';
import {
  updateCemeteryAdmin,
  type UpdateCemeteryAdminInput,
} from '@/src/lib/cemeteries';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<UpdateCemeteryAdminInput>;

    console.log('[api/admin/cemeteries] body =', body);

    if (!body.id) {
      return NextResponse.json(
        { ok: false, error: 'id is required' },
        { status: 400 },
      );
    }

    const input: UpdateCemeteryAdminInput = {
      id: Number(body.id),
      nameVi: body.nameVi ?? '',
      region: body.region ?? 'Bắc',
      typeCode: body.typeCode ?? '',
      addressVi: body.addressVi ?? '',
      prosVi: body.prosVi ?? '',
      extraInfoVi: body.extraInfoVi ?? '',
      isActive: body.isActive ?? true,
      isFeaturedMain: body.isFeaturedMain ?? false,

      // 🔧 여기만 수정
      featuredOrderMain:
        body.featuredOrderMain == null
          ? null
          : Number(body.featuredOrderMain),

      imageUrl:
        body.imageUrl === undefined || body.imageUrl === ''
          ? null
          : body.imageUrl,
    };

    console.log('[api/admin/cemeteries] input =', input);

    await updateCemeteryAdmin(input);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[api/admin/cemeteries] error =', error);
    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? 'Unknown error',
      },
      { status: 500 },
    );
  }
}
