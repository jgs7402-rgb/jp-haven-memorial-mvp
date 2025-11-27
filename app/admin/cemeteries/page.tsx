'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/src/lib/supabase/client';

type Region = 'Bắc' | 'Trung' | 'Nam';

type CemeteryAdminRow = {
  id: number;
  region: Region;
  nameVi: string;
  typeCode: string;
  isActive: boolean;
  isFeaturedMain: boolean;
  featuredOrderMain: number | null;
  imageUrl: string;
};

type FetchState = 'idle' | 'loading' | 'error' | 'success';
type SaveState = 'idle' | 'saving' | 'success' | 'error';

export default function CemeteriesAdminPage() {
  const [rows, setRows] = useState<CemeteryAdminRow[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [saveStates, setSaveStates] = useState<Record<number, SaveState>>({});
  const [saveMessages, setSaveMessages] = useState<Record<number, string | null>>(
    {}
  );

  useEffect(() => {
    const fetchCemeteries = async () => {
      setFetchState('loading');
      setFetchError(null);
      try {
        const { data, error } = await supabaseClient
          .from('cemeteries')
          .select('*')
          .order('region', { ascending: true })
          .order('name_vi', { ascending: true });

        if (error) {
          setFetchState('error');
          setFetchError(error.message);
          return;
        }

        const mapped: CemeteryAdminRow[] =
          data?.map((row) => ({
            id: row.id as number,
            region: row.region as Region,
            nameVi: (row.name_vi as string) ?? '',
            typeCode: (row.type_code as string) ?? '',
            isActive: Boolean(row.is_active),
            isFeaturedMain: Boolean(row.is_featured_main),
            featuredOrderMain:
              row.featured_order_main === null ||
              row.featured_order_main === undefined
                ? null
                : Number(row.featured_order_main),
            imageUrl: (row.image_url as string | null) ?? '',
          })) ?? [];

        setRows(mapped);
        setFetchState('success');
      } catch (err) {
        setFetchState('error');
        setFetchError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchCemeteries();
  }, []);

  const handleFieldChange = <K extends keyof CemeteryAdminRow>(
    id: number,
    key: K,
    value: CemeteryAdminRow[K]
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };

  const handleSave = async (row: CemeteryAdminRow) => {
    setSaveStates((prev) => ({ ...prev, [row.id]: 'saving' }));
    setSaveMessages((prev) => ({ ...prev, [row.id]: null }));

    try {
      const { error } = await supabaseClient
        .from('cemeteries')
        .update({
          is_active: row.isActive,
          is_featured_main: row.isFeaturedMain,
          featured_order_main: row.featuredOrderMain,
          image_url: row.imageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', row.id);

      if (error) {
        setSaveStates((prev) => ({ ...prev, [row.id]: 'error' }));
        setSaveMessages((prev) => ({
          ...prev,
          [row.id]: `저장 오류: ${error.message}`,
        }));
        return;
      }

      setSaveStates((prev) => ({ ...prev, [row.id]: 'success' }));
      setSaveMessages((prev) => ({ ...prev, [row.id]: '저장되었습니다.' }));
    } catch (err) {
      setSaveStates((prev) => ({ ...prev, [row.id]: 'error' }));
      setSaveMessages((prev) => ({
        ...prev,
        [row.id]: `저장 오류: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      }));
    } finally {
      setTimeout(() => {
        setSaveStates((prev) => ({ ...prev, [row.id]: 'idle' }));
        setSaveMessages((prev) => ({ ...prev, [row.id]: null }));
      }, 2000);
    }
  };

  if (fetchState === 'loading') {
    return <div className="p-6 text-sm text-slate-600">로딩 중…</div>;
  }

  if (fetchState === 'error') {
    return (
      <div className="p-6 text-sm text-red-600">
        장지 데이터를 불러오는 중 오류가 발생했습니다.
        {fetchError ? ` (${fetchError})` : ''}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">장지 관리 (Cemeteries)</h1>
        <p className="text-sm text-gray-600">
          장지 목록, 활성 여부, 메인 추천 노출, 이미지 URL 등을 관리합니다.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold text-gray-700">
            <tr>
              <th className="px-3 py-2">이름 (VI)</th>
              <th className="px-3 py-2">지역</th>
              <th className="px-3 py-2">타입</th>
              <th className="px-3 py-2 text-center">활성</th>
              <th className="px-3 py-2 text-center">메인 추천</th>
              <th className="px-3 py-2 text-center">추천 순서</th>
              <th className="px-3 py-2">이미지 URL</th>
              <th className="px-3 py-2 text-center">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="align-middle">
                <td className="px-3 py-2 font-semibold text-slate-900">
                  {row.nameVi}
                </td>
                <td className="px-3 py-2 text-slate-700">{row.region}</td>
                <td className="px-3 py-2 text-slate-700">{row.typeCode}</td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.isActive}
                    onChange={(e) =>
                      handleFieldChange(row.id, 'isActive', e.target.checked)
                    }
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row.isFeaturedMain}
                    onChange={(e) =>
                      handleFieldChange(
                        row.id,
                        'isFeaturedMain',
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="number"
                    className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                    value={row.featuredOrderMain ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        row.id,
                        'featuredOrderMain',
                        e.target.value === '' ? null : Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                    value={row.imageUrl ?? ''}
                    onChange={(e) =>
                      handleFieldChange(row.id, 'imageUrl', e.target.value)
                    }
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => handleSave(row)}
                    disabled={saveStates[row.id] === 'saving'}
                    className="rounded bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                  >
                    {saveStates[row.id] === 'saving' ? '저장 중…' : '저장'}
                  </button>
                  {saveMessages[row.id] ? (
                    <div className="mt-1 text-[11px] text-sky-700">
                      {saveMessages[row.id]}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
