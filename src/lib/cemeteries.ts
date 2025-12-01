// src/lib/cemeteries.ts

import { supabaseServer } from '@/src/lib/supabase/server';

export type Region = 'Bắc' | 'Trung' | 'Nam';

export type CemeteryImage = {
  id: number;
  cemeteryId: number;
  imageUrl: string;
  sortOrder: number | null;
  isMain: boolean;
  createdAt: string;
};

export type Cemetery = {
  id: number;
  region: Region;
  nameKo: string;
  nameVi: string;
  typeCode: string;
  addressVi: string;
  addressShortVi?: string | null;
  locationShortVi?: string | null;
  prosKo: string;
  prosVi: string;
  extraInfoKo: string;
  extraInfoVi: string;
  isActive: boolean;
  isFeaturedMain: boolean;
  featuredOrderMain: number | null;
  imageUrl: string | null;
  mainImageUrl?: string | null;
  lat: number | null;
  lng: number | null;
  createdAt: string;
  updatedAt: string | null;
  metaDescriptionVi?: string | null;

  // 🔹 새로 추가: 부가 이미지들
  images?: CemeteryImage[];
};

export type CemeteryUpdateInput = {
  id: number;
  nameVi: string;
  region: Region;
  typeCode: string;
  addressVi: string;
  prosVi: string;
  extraInfoVi: string;
  isActive: boolean;
  isFeaturedMain: boolean;
  featuredOrderMain: number | null;
  imageUrl: string | null;
};

export type UpdateCemeteryAdminInput = CemeteryUpdateInput;

// ---------- 기본 매핑 함수 ----------

function mapRowToCemetery(row: any): Cemetery {
  return {
    id: row.id,
    region: row.region as Region,
    nameKo: row.name_ko ?? '',
    nameVi: row.name_vi ?? '',
    typeCode: row.type_code ?? '',
    addressVi: row.address_vi ?? '',
    addressShortVi: row.address_short_vi ?? null,
    locationShortVi: row.location_short_vi ?? null,
    prosKo: row.pros_ko ?? '',
    prosVi: row.pros_vi ?? '',
    extraInfoKo: row.extra_info_ko ?? '',
    extraInfoVi: row.extra_info_vi ?? '',
    isActive: row.is_active ?? true,
    isFeaturedMain: row.is_featured_main ?? false,
    featuredOrderMain:
      row.featured_order_main === null || row.featured_order_main === undefined
        ? null
        : Number(row.featured_order_main),
    imageUrl: row.image_url ?? null,
    mainImageUrl: row.main_image_url ?? row.image_url ?? null,
    lat: row.lat ?? null,
    lng: row.lng ?? null,
    createdAt: row.created_at ?? '',
    updatedAt: row.updated_at ?? null,
    metaDescriptionVi: row.meta_description_vi ?? null,

    // images는 fetchCemeteryById에서 따로 채운다
    images: row.images as CemeteryImage[] | undefined,
  };
}

// ---------- 목록용 fetch ----------

export async function fetchCemeteries(): Promise<Cemetery[]> {
  try {
    const { data, error } = await supabaseServer
      .from('cemeteries')
      .select('*')
      .eq('is_active', true)
      .order('region', { ascending: true })
      .order('name_vi', { ascending: true });

    console.log('---------------- fetchCemeteries ----------------');
    console.log('[fetchCemeteries] error =', error);
    console.log('[fetchCemeteries] data =', data);

    if (error || !data) {
      return [];
    }

    return data.map((row) => mapRowToCemetery(row));
  } catch (err) {
    console.error('[fetchCemeteries] unexpected error', err);
    return [];
  }
}

// ---------- 상세용 fetch (cemetery_image와 JOIN) ----------

export async function fetchCemeteryById(id: number): Promise<Cemetery | null> {
  try {
    // 1) cemeteries에서 장지 기본 데이터 가져오기
    const {
      data: cemeteryRow,
      error: cemeteryError,
    } = await supabaseServer
      .from('cemeteries')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    console.log('--- fetchCemeteryById:cemetery ---');
    console.log('[fetchCemeteryById] id =', id);
    console.log('[fetchCemeteryById] cemeteryError =', cemeteryError);
    console.log('[fetchCemeteryById] cemeteryRow =', cemeteryRow);

    if (cemeteryError || !cemeteryRow) {
      // 진짜 장지가 없을 때만 null → /jangji/[id]에서 404
      return null;
    }

    const base = mapRowToCemetery(cemeteryRow);

    // 2) cemetery_image 테이블에서 해당 장지의 부가 이미지들 가져오기
    const {
      data: imageRows,
      error: imageError,
    } = await supabaseServer
      .from('cemetery_image') // ⚠ 실제 테이블 이름 그대로
      .select('*')
      .eq('cemetery_id', id)
      .order('sort_order', { ascending: true });

    console.log('--- fetchCemeteryById:images ---');
    console.log('[fetchCemeteryById] imageError =', imageError);
    console.log('[fetchCemeteryById] imageRows =', imageRows);

    // 이미지 쿼리에서 에러가 나도 페이지 자체는 뜨게 한다
    const images: CemeteryImage[] =
      (imageRows ?? []).map((img: any) => ({
        id: img.id,
        cemeteryId: img.cemetery_id,
        imageUrl: img.image_url,
        sortOrder:
          img.sort_order === null || img.sort_order === undefined
            ? null
            : Number(img.sort_order),
        isMain: img.is_main ?? false,
        createdAt: img.created_at ?? '',
      })) ?? [];

    return {
      ...base,
      images,
    };
  } catch (err) {
    console.error('[fetchCemeteryById] unexpected error', err);
    return null;
  }
}

// ---------- Admin 업데이트용 ----------

export async function updateCemeteryAdmin(
  input: UpdateCemeteryAdminInput,
): Promise<void> {
  const { id, ...rest } = input;

  const { error } = await supabaseServer
    .from('cemeteries')
    .update({
      name_vi: rest.nameVi,
      region: rest.region,
      type_code: rest.typeCode,
      address_vi: rest.addressVi,
      pros_vi: rest.prosVi,
      extra_info_vi: rest.extraInfoVi,
      is_active: rest.isActive,
      is_featured_main: rest.isFeaturedMain,
      featured_order_main: rest.featuredOrderMain,
      image_url: rest.imageUrl,
      // updated_at은 DB에서 trigger로 관리하거나 여기서 now() 넣어도 된다.
    })
    .eq('id', id);

  if (error) {
    console.error('[updateCemeteryAdmin] error', error);
    throw new Error(`Failed to update cemetery id=${id}: ${error.message}`);
  }
}
