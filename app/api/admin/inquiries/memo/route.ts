// app/api/admin/inquiries/memo/route.ts

import { NextResponse } from 'next/server';
import { updateInquiryMemo } from '@/src/lib/inquiries';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = Number(body.id);
    const memo =
      typeof body.memo === 'string' ? body.memo.trim() || null : null;

    if (!id) {
      return NextResponse.json(
        { ok: false, error: 'Missing inquiry id' },
        { status: 400 },
      );
    }

    const result = await updateInquiryMemo(id, memo);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error ?? 'Failed to update memo' },
        { status: 500 },
      );
    }

    // ✅ 더 이상 result.data 같은 건 사용하지 않는다.
    return NextResponse.json({ ok: true, error: null });
  } catch (error: any) {
    console.error('[api/admin/inquiries/memo] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 },
    );
  }
}





