// app/api/admin/inquiries/memo/route.ts
import { NextResponse } from 'next/server';
import { updateInquiryMemo } from '@/src/lib/inquiries';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, memo } = body as { id: number; memo: string | null };

    if (!id) {
      return NextResponse.json(
        { ok: false, error: 'id is required' },
        { status: 400 },
      );
    }

    const result = await updateInquiryMemo(id, memo);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error: any) {
    console.error('[api/admin/inquiries/memo] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}


