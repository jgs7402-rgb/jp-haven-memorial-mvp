// src/lib/cemeteries.ts
import { supabaseServer } from '@/src/lib/supabase/server';

export type Region = 'Bắc' | 'Trung' | 'Nam';

export type Cemetery = {
  id: number;
  region: Region;
  nameKo: string;
  nameVi: string;
  typeCode: string;
  addressVi: string;
  prosKo: string;
  prosVi: string;
  extraInfoKo: string;
  extraInfoVi: string;
  lat: number | null;
  lng: number | null;
  isActive: boolean;
};

function mapRowToCemetery(row: any): Cemetery {
  return {
    id: row.id,
    region: row.region as Region,
    nameKo: row.name_ko ?? '',
    nameVi: row.name_vi ?? '',
    typeCode: row.type_code ?? '',
    addressVi: row.address_vi ?? '',
    prosKo: row.pros_ko ?? '',
    prosVi: row.pros_vi ?? '',
    extraInfoKo: row.extra_info_ko ?? '',
    extraInfoVi: row.extra_info_vi ?? '',
    lat: row.lat ?? null,
    lng: row.lng ?? null,
    isActive: row.is_active ?? true,
  };
}

export async function fetchCemeteries(): Promise<Cemetery[]> {
  const { data, error } = await supabaseServer
    .from('cemeteries')
    .select('*')
    .eq('is_active', true)
    .order('region', { ascending: true })
    .order('name_vi', { ascending: true });

  console.log('---------------- fetchCemeteries ----------------');
  console.log('[fetchCemeteries] FULL ERROR =', JSON.stringify(error, null, 2));
  console.log('[fetchCemeteries] error =', error);
  console.log('[fetchCemeteries] data =', data);

  if (error) {
    return [];
  }

  if (!data) {
    return [];
  }

  console.log('[fetchCemeteries] rows:', data.length);
  return data.map(mapRowToCemetery);
}
