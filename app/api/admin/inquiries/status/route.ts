// app/api/admin/inquiries/status/route.ts
import { NextResponse } from 'next/server';
import { updateInquiryStatus, type InquiryStatus } from '@/src/lib/inquiries';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body as { id: number; status: InquiryStatus };

    if (!id || !status) {
      return NextResponse.json(
        { ok: false, error: 'id and status are required' },
        { status: 400 },
      );
    }

    if (!['new', 'in_progress', 'done'].includes(status)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid status value' },
        { status: 400 },
      );
    }

    const result = await updateInquiryStatus(id, status);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error: any) {
    console.error('[api/admin/inquiries/status] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}


