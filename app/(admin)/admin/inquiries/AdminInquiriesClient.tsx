// app/(admin)/admin/inquiries/AdminInquiriesClient.tsx

'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { InquiryRow } from '@/src/lib/inquiries';
import { updateInquiryStatusAction, deleteInquiryAction } from './actions';

type Props = {
  inquiries: InquiryRow[];
};

const STATUS_LABELS: Record<string, string> = {
  new: '신규',
  in_progress: '진행중',
  done: '완료',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  in_progress: 'bg-blue-100 text-blue-700',
  done: 'bg-gray-100 text-gray-700',
};

const STATUS_COLORS_CARD: Record<string, string> = {
  new: 'bg-emerald-100 text-emerald-700',
  in_progress: 'bg-sky-100 text-sky-700',
  done: 'bg-slate-100 text-slate-600',
};

type InquiryCardProps = {
  inquiry: InquiryRow;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  isPending: boolean;
};

function InquiryCard({ inquiry, onStatusChange, onDelete, isPending }: InquiryCardProps) {
  const inquiryContent = inquiry.note || inquiry.message || null;
  const hasBoth = inquiry.note && inquiry.message;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
      {/* Header: 이름, 전화번호, 이메일, 상태 */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {inquiry.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{inquiry.phone}</p>
          {inquiry.email && (
            <p className="text-xs text-slate-500 mt-0.5">{inquiry.email}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <select
            value={inquiry.status}
            onChange={(e) => onStatusChange(inquiry.id, e.target.value)}
            disabled={isPending}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="new">신규</option>
            <option value="in_progress">진행중</option>
            <option value="done">완료</option>
          </select>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS_CARD[inquiry.status] ?? STATUS_COLORS_CARD.new}`}
          >
            {STATUS_LABELS[inquiry.status] ?? inquiry.status}
          </span>
        </div>
      </div>

      {/* 메타 정보: 지역, 예산, 생성일 */}
      <div className="text-xs text-slate-500 space-y-1">
        <div>지역: {inquiry.region ?? '-'}</div>
        <div>예산: {inquiry.budget ?? '-'}</div>
        <div>
          생성일: {new Date(inquiry.created_at).toLocaleString('ko-KR')}
        </div>
      </div>

      {/* 문의 내용 */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-1">문의 내용</div>
        <div className="mt-1 rounded-md bg-slate-50 p-2 text-xs text-slate-700 whitespace-pre-wrap max-h-32 overflow-y-auto">
          {hasBoth ? (
            <div className="space-y-1">
              <div>{inquiry.note}</div>
              <div className="text-slate-500 border-t border-slate-200 pt-1 mt-1">
                {inquiry.message}
              </div>
            </div>
          ) : (
            inquiryContent ?? '문의 내용이 없습니다.'
          )}
        </div>
      </div>

      {/* 메모 */}
      {inquiry.memo && (
        <div className="text-xs text-slate-500">
          <span className="font-medium">메모:</span> {inquiry.memo}
        </div>
      )}

      {/* 삭제 버튼 */}
      <div className="flex justify-end pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onDelete(inquiry.id)}
          disabled={isPending}
          className="text-xs text-red-600 hover:text-red-700 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export function AdminInquiriesClient({ inquiries }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  // 상태별로 문의를 분류: 신규 → 진행중 → 완료 순서
  const newInquiries = inquiries.filter((q) => q.status === 'new');
  const inProgressInquiries = inquiries.filter((q) => q.status === 'in_progress');
  const doneInquiries = inquiries.filter((q) => q.status === 'done');

  // 최종 정렬된 문의 목록: 신규 → 진행중 → 완료
  const orderedInquiries = [
    ...newInquiries,
    ...inProgressInquiries,
    ...doneInquiries,
  ];

  function handleStatusChange(id: number, nextStatus: string) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('id', String(id));
      formData.append('status', nextStatus);
      await updateInquiryStatusAction(formData);
      router.refresh();
    });
  }

  function handleDelete(id: number) {
    if (!confirm('정말 이 문의를 삭제할까요?')) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteInquiryAction(id);
        router.refresh();
      } catch (err) {
        console.error('[AdminInquiriesClient] deleteInquiry failed =', err);
        alert('삭제 중 오류가 발생했습니다.');
      }
    });
  }

  function renderInquiryContent(note: string | null, message: string | null) {
    if (note && message) {
      return (
        <div className="space-y-1">
          <div className="text-xs">{note}</div>
          <div className="text-xs text-slate-500">{message}</div>
        </div>
      );
    }
    if (note) return <div className="text-xs">{note}</div>;
    if (message) return <div className="text-xs">{message}</div>;
    return <span className="text-slate-400">-</span>;
  }

  if (!inquiries.length) {
    return (
      <div className="text-sm text-slate-500">
        아직 문의가 없습니다. 공개 사이트의 문의 폼에서 제출된 문의가 여기에 표시됩니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 헤더: 통계 + 뷰 모드 토글 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          총 {inquiries.length}개의 문의가 있습니다. (신규: {newInquiries.length}, 진행중: {inProgressInquiries.length}, 완료: {doneInquiries.length})
        </p>

        {/* 뷰 모드 토글 */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1 bg-slate-50">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === 'table'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            표 보기
          </button>
          <button
            type="button"
            onClick={() => setViewMode('card')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              viewMode === 'card'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            카드 보기
          </button>
        </div>
      </div>

      {/* 테이블 뷰 */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">이름</th>
                <th className="px-3 py-2 text-left">전화번호</th>
                <th className="px-3 py-2 text-left">이메일</th>
                <th className="px-3 py-2 text-left">지역</th>
                <th className="px-3 py-2 text-left">예산</th>
                <th className="px-3 py-2 text-left">문의 내용</th>
                <th className="px-3 py-2 text-left">상태</th>
                <th className="px-3 py-2 text-left">메모</th>
                <th className="px-3 py-2 text-left">생성일</th>
                <th className="px-3 py-2 text-left">작업</th>
              </tr>
            </thead>
            <tbody>
              {orderedInquiries.map((inq) => (
                <tr key={inq.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{inq.id}</td>
                  <td className="px-3 py-2">{inq.name}</td>
                  <td className="px-3 py-2">{inq.phone}</td>
                  <td className="px-3 py-2">{inq.email ?? '-'}</td>
                  <td className="px-3 py-2">{inq.region ?? '-'}</td>
                  <td className="px-3 py-2">{inq.budget ?? '-'}</td>
                  <td className="px-3 py-2 max-w-xs">
                    {renderInquiryContent(inq.note, inq.message)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value)
                        }
                        disabled={isPending}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option value="new">신규</option>
                        <option value="in_progress">진행중</option>
                        <option value="done">완료</option>
                      </select>
                      <span
                        className={`text-xs rounded-full px-2 py-0.5 ${STATUS_COLORS[inq.status] ?? STATUS_COLORS.new}`}
                      >
                        {STATUS_LABELS[inq.status] ?? inq.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{inq.memo ?? '-'}</td>
                  <td className="px-3 py-2">
                    {new Date(inq.created_at).toLocaleString('ko-KR')}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      disabled={isPending}
                      className="text-xs text-red-600 hover:text-red-700 hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 카드 뷰 */}
      {viewMode === 'card' && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orderedInquiries.map((inq) => (
            <InquiryCard
              key={inq.id}
              inquiry={inq}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              isPending={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}
