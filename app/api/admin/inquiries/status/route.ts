// app/api/admin/inquiries/status/route.ts

import { NextResponse } from 'next/server';
import { updateInquiryStatus, type InquiryStatus } from '@/src/lib/inquiries';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = Number(body.id);
    const statusValue = String(body.status || '').trim();

    if (!id || !statusValue) {
      return NextResponse.json(
        { ok: false, error: 'Missing id or status' },
        { status: 400 },
      );
    }

    const status = statusValue as InquiryStatus;

    const result = await updateInquiryStatus(id, status);

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: result.error ?? 'Failed to update status',
        },
        { status: 500 },
      );
    }

    // 🔥 더 이상 result.data 같은 건 절대 쓰지 않는다.
    return NextResponse.json({ ok: true, error: null });
  } catch (error: any) {
    console.error('[api/admin/inquiries/status] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 },
    );
  }
}






