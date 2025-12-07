// src/lib/siteSettings.ts

import { supabaseServer } from '@/src/lib/supabase/server';

export const SITE_SETTINGS_ROW_ID = 1;

export type SiteSettings = {
  id: number;
  hotlineNumber: string | null;
  businessHoursText: string | null;
  supportEmail: string | null;
  hotlineNoticeVi: string | null;
  hotlineNoticeKo: string | null;
  heroTitleVi: string | null;
  heroSubtitleVi: string | null;
  heroCtaPrimaryVi: string | null;
  heroCtaSecondaryVi: string | null;
  heroCtaTertiaryVi: string | null;
  footerMessageVi: string | null;
  zaloUrl: string | null;
  facebookUrl: string | null;
  siteNameVi: string | null;
  footerMenuTitleVi: string | null;
  footerMenuNghiaTrangVi: string | null;
  footerMenuAboutVi: string | null;
  footerContactTitleVi: string | null;
  footerSocialTitleVi: string | null;
  footerCertLabelVi: string | null;
  footerCertLogoUrl: string | null;
  seoDefaultTitleVi: string | null;
  seoDefaultDescriptionVi: string | null;
  ogDefaultTitleVi: string | null;
  ogDefaultDescriptionVi: string | null;
  ogDefaultImageUrl: string | null;
  ogDefaultImageAltVi: string | null;
  termsContentVi: string | null;
  privacyContentVi: string | null;
};

const siteSettingsColumnMap: Record<keyof Omit<SiteSettings, 'id'>, string> = {
  hotlineNumber: 'hotline_number',
  businessHoursText: 'business_hours_text',
  supportEmail: 'support_email',
  hotlineNoticeVi: 'hotline_notice_vi',
  hotlineNoticeKo: 'hotline_notice_ko',
  heroTitleVi: 'hero_title_vi',
  heroSubtitleVi: 'hero_subtitle_vi',
  heroCtaPrimaryVi: 'hero_cta_primary_vi',
  heroCtaSecondaryVi: 'hero_cta_secondary_vi',
  heroCtaTertiaryVi: 'hero_cta_tertiary_vi',
  footerMessageVi: 'footer_message_vi',
  zaloUrl: 'zalo_url',
  facebookUrl: 'facebook_url',
  siteNameVi: 'site_name_vi',
  footerMenuTitleVi: 'footer_menu_title_vi',
  footerMenuNghiaTrangVi: 'footer_menu_nghiatrang_vi',
  footerMenuAboutVi: 'footer_menu_about_vi',
  footerContactTitleVi: 'footer_contact_title_vi',
  footerSocialTitleVi: 'footer_social_title_vi',
  footerCertLabelVi: 'footer_cert_label_vi',
  footerCertLogoUrl: 'footer_cert_logo_url',
  seoDefaultTitleVi: 'seo_default_title_vi',
  seoDefaultDescriptionVi: 'seo_default_description_vi',
  ogDefaultTitleVi: 'og_default_title_vi',
  ogDefaultDescriptionVi: 'og_default_description_vi',
  ogDefaultImageUrl: 'og_default_image_url',
  ogDefaultImageAltVi: 'og_default_image_alt_vi',
  termsContentVi: 'terms_content_vi',
  privacyContentVi: 'privacy_content_vi',
};

function toNullOrString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: SITE_SETTINGS_ROW_ID,
  hotlineNumber: null,
  businessHoursText: '08:00 – 21:00 (Giờ Việt Nam)',
  supportEmail: 'info@jphaven.com',
  hotlineNoticeVi: null,
  hotlineNoticeKo: null,
  heroTitleVi:
    'Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.',
  heroSubtitleVi:
    'Dịch vụ tư vấn do người Hàn Quốc vận hành, hỗ trợ gia đình Việt Nam hiểu rõ chi phí và lựa chọn trước khi ra nghĩa trang.',
  heroCtaPrimaryVi: 'Gọi tư vấn ngay',
  heroCtaSecondaryVi: 'Để lại thông tin tư vấn',
  heroCtaTertiaryVi: 'Chat qua Zalo',
  footerMessageVi: 'Dịch vụ tư vấn do người Hàn Quốc vận hành',
  zaloUrl: 'https://zalo.me/3258467487025854421',
  facebookUrl: '#',
  siteNameVi: 'JP Haven',
  footerMenuTitleVi: 'Menu',
  footerMenuNghiaTrangVi: 'Nghĩa trang',
  footerMenuAboutVi: 'Giới thiệu công ty',
  footerContactTitleVi: 'Liên hệ',
  footerSocialTitleVi: 'Mạng xã hội',
  footerCertLabelVi: 'Logo chứng nhận (placeholder)',
  footerCertLogoUrl: null,
  seoDefaultTitleVi:
    'JP Haven – Tư vấn nghĩa trang & lưu tro cốt cho gia đình Việt Nam',
  seoDefaultDescriptionVi:
    'JP Haven Memorial đồng hành cùng gia đình chuẩn bị nơi an nghỉ cuối cùng một cách bình tĩnh, minh bạch chi phí và dễ dàng so sánh các nghĩa trang tại Việt Nam.',
  ogDefaultTitleVi:
    'JP Haven – Tư vấn nghĩa trang & lưu tro cốt cho gia đình Việt Nam',
  ogDefaultDescriptionVi:
    'Thông tin nghĩa trang minh bạch, hỗ trợ gia đình so sánh lựa chọn và chuẩn bị nơi an nghỉ cuối cùng mà không phải vội vàng.',
  ogDefaultImageUrl: 'https://example.com/og-default.jpg', // TODO: set to the real OG image URL after uploading the image to production
  ogDefaultImageAltVi:
    'Không gian lưu tro cốt hiện đại, sáng và trang trọng của JP Haven Memorial tại Việt Nam.',
  termsContentVi: null,
  privacyContentVi: null,
};

export function mapRowToSiteSettings(row: Record<string, any>): SiteSettings {
  return {
    id: row.id,
    hotlineNumber: row.hotline_number ?? null,
    businessHoursText: row.business_hours_text ?? null,
    supportEmail: row.support_email ?? null,
    hotlineNoticeVi: row.hotline_notice_vi ?? null,
    hotlineNoticeKo: row.hotline_notice_ko ?? null,
    heroTitleVi: row.hero_title_vi ?? null,
    heroSubtitleVi: row.hero_subtitle_vi ?? null,
    heroCtaPrimaryVi: row.hero_cta_primary_vi ?? null,
    heroCtaSecondaryVi: row.hero_cta_secondary_vi ?? null,
    heroCtaTertiaryVi: row.hero_cta_tertiary_vi ?? null,
    footerMessageVi: row.footer_message_vi ?? null,
    zaloUrl: row.zalo_url ?? null,
    facebookUrl: row.facebook_url ?? null,
    siteNameVi: row.site_name_vi ?? null,
    footerMenuTitleVi: row.footer_menu_title_vi ?? null,
    footerMenuNghiaTrangVi: row.footer_menu_nghiatrang_vi ?? null,
    footerMenuAboutVi: row.footer_menu_about_vi ?? null,
    footerContactTitleVi: row.footer_contact_title_vi ?? null,
    footerSocialTitleVi: row.footer_social_title_vi ?? null,
    footerCertLabelVi: row.footer_cert_label_vi ?? null,
    footerCertLogoUrl: row.footer_cert_logo_url ?? null,
    seoDefaultTitleVi: row.seo_default_title_vi ?? null,
    seoDefaultDescriptionVi: row.seo_default_description_vi ?? null,
    ogDefaultTitleVi: row.og_default_title_vi ?? null,
    ogDefaultDescriptionVi: row.og_default_description_vi ?? null,
    ogDefaultImageUrl: row.og_default_image_url ?? null,
    ogDefaultImageAltVi: row.og_default_image_alt_vi ?? null,
    termsContentVi: row.terms_content_vi ?? null,
    privacyContentVi: row.privacy_content_vi ?? null,
  };
}

export function mapSiteSettingsToDb(
  payload: Partial<SiteSettings>,
): Record<string, string | null | number> {
  const dbPayload: Record<string, string | null | number> = {
    id: payload.id ?? SITE_SETTINGS_ROW_ID,
  };

  (Object.keys(siteSettingsColumnMap) as Array<
    keyof Omit<SiteSettings, 'id'>
  >).forEach((key) => {
    const value = payload[key];
    if (value !== undefined) {
      dbPayload[siteSettingsColumnMap[key]] = toNullOrString(value);
    }
  });

  return dbPayload;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabaseServer
      .from('site_settings')
      .select('*')
      .eq('id', SITE_SETTINGS_ROW_ID)
      .single();

    if (error || !data) {
      console.error('[getSiteSettings] error =', error);

      const { data: seededData, error: seedError } = await supabaseServer
        .from('site_settings')
        .upsert(mapSiteSettingsToDb(DEFAULT_SITE_SETTINGS), {
          onConflict: 'id',
        })
        .select('*')
        .single();

      if (seedError) {
        console.error('[getSiteSettings] seed error =', seedError);
        return DEFAULT_SITE_SETTINGS;
      }

      if (seededData) {
        return mapRowToSiteSettings(seededData);
      }

      return DEFAULT_SITE_SETTINGS;
    }

    return mapRowToSiteSettings(data);
  } catch (err) {
    console.error('[getSiteSettings] unexpected error =', err);
    return DEFAULT_SITE_SETTINGS;
  }
}

// 기존 코드 호환용 alias
export { getSiteSettings as fetchSiteSettings };
