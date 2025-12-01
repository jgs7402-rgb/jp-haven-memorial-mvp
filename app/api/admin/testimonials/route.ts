// app/api/admin/testimonials/route.ts
import { NextResponse } from 'next/server';
import {
  getHomepageTestimonialsForAdmin,
  upsertHomepageTestimonial,
  type HomepageTestimonialInput,
} from '@/src/lib/homepageTestimonials';

function isValidString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function GET() {
  try {
    const testimonials = await getHomepageTestimonialsForAdmin();
    return NextResponse.json({ testimonials });
  } catch (error: any) {
    console.error('[TESTIMONIALS_GET_API_ERROR]', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to fetch testimonials' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<HomepageTestimonialInput>;

    if (!isValidString(body.quoteVi)) {
      return NextResponse.json(
        { error: 'quoteVi is required' },
        { status: 400 },
      );
    }
    if (!isValidString(body.metaVi)) {
      return NextResponse.json(
        { error: 'metaVi is required' },
        { status: 400 },
      );
    }

    const sortOrder =
      body.sortOrder === undefined || body.sortOrder === null
        ? 1
        : Number(body.sortOrder);

    const testimonial = await upsertHomepageTestimonial({
      id: body.id ?? null,
      quoteVi: (body.quoteVi as string).trim(),
      metaVi: (body.metaVi as string).trim(),
      sortOrder: Number.isNaN(sortOrder) ? 1 : sortOrder,
      isActive: body.isActive ?? true,
    });

    return NextResponse.json({ testimonial });
  } catch (error: any) {
    console.error('[TESTIMONIALS_POST_API_ERROR]', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to save testimonial' },
      { status: 500 },
    );
  }
}
