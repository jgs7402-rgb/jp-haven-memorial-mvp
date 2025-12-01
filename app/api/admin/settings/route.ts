// app/api/admin/settings/route.ts
import { NextResponse } from 'next/server';
import {
  SITE_SETTINGS_ROW_ID,
  getSiteSettings,
  mapRowToSiteSettings,
  mapSiteSettingsToDb,
  type SiteSettings,
} from '@/src/lib/siteSettings';
import { supabaseServer } from '@/src/lib/supabase/server';

type SiteSettingsPayload = Partial<Omit<SiteSettings, 'id'>>;

const editableKeys: Array<keyof SiteSettingsPayload> = [
  'hotlineNumber',
  'businessHoursText',
  'supportEmail',
  'heroTitleVi',
  'heroSubtitleVi',
  'heroCtaPrimaryVi',
  'heroCtaSecondaryVi',
  'heroCtaTertiaryVi',
  'footerMessageVi',
  'zaloUrl',
  'facebookUrl',
  'siteNameVi',
  'footerMenuTitleVi',
  'footerMenuNghiaTrangVi',
  'footerMenuAboutVi',
  'footerContactTitleVi',
  'footerSocialTitleVi',
  'footerCertLabelVi',
  'footerCertLogoUrl',
  'seoDefaultTitleVi',
  'seoDefaultDescriptionVi',
  'ogDefaultTitleVi',
  'ogDefaultDescriptionVi',
  'ogDefaultImageUrl',
  'ogDefaultImageAltVi',
];

function validatePayload(body: unknown):
  | { ok: true; payload: SiteSettingsPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Payload must be an object' };
  }

  const payload: SiteSettingsPayload = {};

  for (const key of editableKeys) {
    const value = (body as Record<string, unknown>)[key];
    if (value === undefined) continue;

    if (value !== null && typeof value !== 'string') {
      return { ok: false, error: `${key} must be a string or null` };
    }

    payload[key] = value === null ? null : (value as string);
  }

  return { ok: true, payload };
}

export async function GET() {
  try {
    const settings = await getSiteSettings();
    if (!settings) {
      return NextResponse.json(
        { ok: false, error: 'site_settings not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, data: settings });
  } catch (error: any) {
    console.error('[api/admin/settings][GET] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = validatePayload(body);

    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 },
      );
    }

    const dbPayload = mapSiteSettingsToDb({
      id: SITE_SETTINGS_ROW_ID,
      ...validation.payload,
    });

    const { data, error } = await supabaseServer
      .from('site_settings')
      .upsert(dbPayload, { onConflict: 'id' })
      .select('*')
      .single();

    if (error || !data) {
      console.error('[api/admin/settings][POST] upsert error =', error);
      return NextResponse.json(
        { ok: false, error: error?.message ?? 'Failed to save settings' },
        { status: 500 },
      );
    }

    const settings = mapRowToSiteSettings(data);

    return NextResponse.json({ ok: true, data: settings });
  } catch (error: any) {
    console.error('[api/admin/settings][POST] unexpected error =', error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'Unknown error' },
      { status: 500 },
    );
  }
}
