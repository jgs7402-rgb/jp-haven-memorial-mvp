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

/**
 * cemetery_image 테이블에서 cemeteries.id 목록에 해당하는 이미지들을
 * cemeteryId 기준으로 묶어서 반환하는 헬퍼
 */
async function fetchImagesByCemeteryIds(
  cemeteryIds: number[],
): Promise<Record<number, any[]>> {
  const result: Record<number, any[]> = {};

  if (cemeteryIds.length === 0) {
    return result;
  }

  const { data, error } = await supabaseServer
    .from('cemetery_image')
    .select('*')
    .in('cemetery_id', cemeteryIds);

  console.log('--- fetchImagesByCemeteryIds ---');
  console.log('[fetchImagesByCemeteryIds] error =', error);
  console.log(
    '[fetchImagesByCemeteryIds] row count =',
    Array.isArray(data) ? data.length : 'no data',
  );

  if (error || !data) {
    return result;
  }

  for (const row of data) {
    const cid = row.cemetery_id as number;
    if (!result[cid]) {
      result[cid] = [];
    }
    result[cid].push(row);
  }

  return result;
}

// 공통 매핑 함수
function mapRowToCemetery(row: any): Cemetery {
  const imageRows: any[] = row.cemetery_image ?? row.images ?? [];
  const mappedImages: CemeteryImage[] = imageRows.map((img) => ({
    id: img.id,
    cemeteryId: img.cemetery_id,
    imageUrl: img.image_url,
    sortOrder:
      img.sort_order === null || img.sort_order === undefined
        ? null
        : Number(img.sort_order),
    isMain: img.is_main ?? false,
    createdAt: img.created_at ?? '',
  }));

  const mainImageFromChild =
    mappedImages.find((img) => img.isMain)?.imageUrl ?? null;

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
    mainImageUrl:
      row.main_image_url ?? mainImageFromChild ?? row.image_url ?? null,
    lat: row.lat ?? null,
    lng: row.lng ?? null,
    createdAt: row.created_at ?? '',
    updatedAt: row.updated_at ?? null,
    metaDescriptionVi: row.meta_description_vi ?? null,
    images: mappedImages,
  };
}

// 전체 목록 (Admin, /jangji 리스트에서 사용)
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
    console.log(
      '[fetchCemeteries] row count =',
      Array.isArray(data) ? data.length : 'no data',
    );

    if (error || !data) {
      return [];
    }

    const ids = data
      .map((row) => row.id as number | null)
      .filter((id): id is number => typeof id === 'number');

    const imagesByCemeteryId = await fetchImagesByCemeteryIds(ids);

    const rowsWithImages = data.map((row) => ({
      ...row,
      images: imagesByCemeteryId[row.id as number] ?? [],
    }));

    return rowsWithImages.map(mapRowToCemetery);
  } catch (err) {
    console.error('[fetchCemeteries] unexpected error', err);
    return [];
  }
}

// 홈 추천 장지
export async function fetchFeaturedCemeteriesForHome(): Promise<Cemetery[]> {
  try {
    const { data, error } = await supabaseServer
      .from('cemeteries')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured_main', true)
      .order('featured_order_main', { ascending: true })
      .order('id', { ascending: true });

    console.log(
      '[fetchFeaturedCemeteriesForHome] row count =',
      Array.isArray(data) ? data.length : 'no data',
      'error =',
      error,
    );

    if (error || !data) {
      return [];
    }

    const ids = data
      .map((row) => row.id as number | null)
      .filter((id): id is number => typeof id === 'number');

    const imagesByCemeteryId = await fetchImagesByCemeteryIds(ids);

    const rowsWithImages = data.map((row) => ({
      ...row,
      images: imagesByCemeteryId[row.id as number] ?? [],
    }));

    return rowsWithImages.map(mapRowToCemetery);
  } catch (err) {
    console.error('[fetchFeaturedCemeteriesForHome] unexpected error', err);
    return [];
  }
}

// 상세
export async function fetchCemeteryById(id: number): Promise<Cemetery | null> {
  try {
    const { data, error } = await supabaseServer
      .from('cemeteries')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    console.log('--- fetchCemeteryById ---');
    console.log('[fetchCemeteryById] id =', id);
    console.log('[fetchCemeteryById] error =', error);
    console.log('[fetchCemeteryById] has data =', data ? 'yes' : 'no');

    if (error || !data) {
      return null;
    }

    const imagesByCemeteryId = await fetchImagesByCemeteryIds([id]);
    const rowWithImages = {
      ...data,
      images: imagesByCemeteryId[id] ?? [],
    };

    return mapRowToCemetery(rowWithImages);
  } catch (err) {
    console.error('[fetchCemeteryById] unexpected error', err);
    return null;
  }
}

// Admin 업데이트
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
    })
    .eq('id', id);

  if (error) {
    console.error('[updateCemeteryAdmin] error', error);
    throw new Error(`Failed to update cemetery id=${id}: ${error.message}`);
  }
}
