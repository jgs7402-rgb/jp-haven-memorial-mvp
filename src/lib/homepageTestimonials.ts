// src/lib/homepageTestimonials.ts
import { supabaseServer } from '@/src/lib/supabase/server';

export type HomepageTestimonialRow = {
  id: number;
  quote_vi: string;
  meta_vi: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type HomepageTestimonial = {
  id: number;
  quoteVi: string;
  metaVi: string;
  sortOrder: number;
  isActive: boolean;
};

export type HomepageTestimonialInput = {
  id: number | null;
  quoteVi: string;
  metaVi: string;
  sortOrder: number;
  isActive: boolean;
};

function mapRow(row: HomepageTestimonialRow): HomepageTestimonial {
  return {
    id: row.id,
    quoteVi: row.quote_vi,
    metaVi: row.meta_vi,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export async function getHomepageTestimonialsForAdmin(): Promise<
  HomepageTestimonial[]
> {
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from('homepage_testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error || !data) {
    console.error('[getHomepageTestimonialsForAdmin] error =', error);
    return [];
  }

  return data.map(mapRow);
}

export async function getHomepageTestimonialsForPublic(): Promise<
  { quote: string; meta: string }[]
> {
  const supabase = supabaseServer;
  const { data, error } = await supabase
    .from('homepage_testimonials')
    .select('quote_vi, meta_vi, sort_order, is_active, id')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error || !data) {
    console.error('[getHomepageTestimonialsForPublic] error =', error);
    return [];
  }

  return data.map((row) => ({
    quote: row.quote_vi,
    meta: row.meta_vi,
  }));
}

export async function upsertHomepageTestimonial(
  input: HomepageTestimonialInput,
): Promise<HomepageTestimonial> {
  const supabase = supabaseServer;

  const payload = {
    id: input.id ?? undefined,
    quote_vi: input.quoteVi,
    meta_vi: input.metaVi,
    sort_order: input.sortOrder,
    is_active: input.isActive,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('homepage_testimonials')
    .upsert(payload, { onConflict: 'id' })
    .select('*')
    .single();

  if (error || !data) {
    console.error('[upsertHomepageTestimonial] error =', error);
    throw new Error(error?.message ?? 'Failed to upsert testimonial');
  }

  return mapRow(data as HomepageTestimonialRow);
}
