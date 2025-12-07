// app/(admin)/admin/cemeteries/actions.ts

'use server';

import { supabaseServer } from '@/src/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Region } from '@/src/lib/cemeteries';

export async function createCemeteryAction(formData: FormData) {
  const nameVi = String(formData.get('nameVi') ?? '').trim();
  const region = String(formData.get('region') ?? '').trim() as Region;
  const typeCode = String(formData.get('typeCode') ?? '').trim();
  const addressVi = String(formData.get('addressVi') ?? '').trim();
  const prosVi = String(formData.get('prosVi') ?? '').trim();
  const extraInfoVi = String(formData.get('extraInfoVi') ?? '').trim();
  const imageUrl = String(formData.get('imageUrl') ?? '').trim();

  // 필수 필드 검증
  if (!nameVi || !region || !typeCode) {
    return {
      ok: false,
      error: '이름, 지역, 타입 코드는 필수입니다.',
    };
  }

  // Region 검증
  if (!['Bắc', 'Trung', 'Nam'].includes(region)) {
    return {
      ok: false,
      error: '지역은 Bắc, Trung, Nam 중 하나여야 합니다.',
    };
  }

  try {
    const { data, error } = await supabaseServer
      .from('cemeteries')
      .insert({
        name_vi: nameVi,
        name_ko: nameVi, // 기본값으로 nameVi 사용
        region: region,
        type_code: typeCode,
        address_vi: addressVi || '',
        pros_vi: prosVi || '',
        pros_ko: prosVi || '', // 기본값으로 prosVi 사용
        extra_info_vi: extraInfoVi || '',
        extra_info_ko: extraInfoVi || '', // 기본값으로 extraInfoVi 사용
        image_url: imageUrl || null,
        is_active: true,
        is_featured_main: false,
        featured_order_main: null,
      })
      .select('*')
      .single();

    if (error || !data) {
      console.error('[createCemeteryAction] error =', error);
      return {
        ok: false,
        error: error?.message ?? '장지 생성에 실패했습니다.',
      };
    }

    // 페이지 재검증
    revalidatePath('/admin/cemeteries');
    revalidatePath('/jangji');
    revalidatePath('/');

    return {
      ok: true,
      data: { id: data.id },
    };
  } catch (err) {
    console.error('[createCemeteryAction] unexpected error =', err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function deleteCemeteryAction(id: number) {
  if (!id || typeof id !== 'number') {
    return {
      ok: false,
      error: '유효하지 않은 ID입니다.',
    };
  }

  try {
    // TODO: also delete related images/rows if needed
    // If FK constraints with ON DELETE CASCADE are configured, Supabase will handle cleanup.
    // Otherwise, manually delete from cemetery_image table first.

    const { error } = await supabaseServer
      .from('cemeteries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[deleteCemeteryAction] error =', error);
      return {
        ok: false,
        error: error.message ?? '장지 삭제에 실패했습니다.',
      };
    }

    // 페이지 재검증
    revalidatePath('/admin/cemeteries');
    revalidatePath('/jangji');
    revalidatePath('/');

    return {
      ok: true,
    };
  } catch (err) {
    console.error('[deleteCemeteryAction] unexpected error =', err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}





