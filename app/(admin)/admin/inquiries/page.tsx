const mockInquiries = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0901 xxx xxx',
    region: 'Bắc',
    budget: '50-80 triệu',
    status: '신규',
    memo: '전화 상담 요청',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    phone: '0902 xxx xxx',
    region: 'Nam',
    budget: '100-150 triệu',
    status: '진행중',
    memo: '이메일 안내 완료',
  },
  {
    id: 3,
    name: 'Lê C',
    phone: '0903 xxx xxx',
    region: 'Trung',
    budget: '미정',
    status: '완료',
    memo: '현장 투어 예정',
  },
];

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">문의 관리</p>
        <h1 className="text-2xl font-bold">Inquiries (mock)</h1>
        <p className="text-sm text-slate-500">
          상태 변경/메모 수정은 자리만 마련되어 있습니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockInquiries.map((item) => (
          <div
            key={item.id}
            className="section-card border border-slate-200 p-4 shadow-soft rounded-xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{item.name}</p>
              <span className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                {item.status}
              </span>
            </div>
            <p className="text-xs text-slate-500">전화: {item.phone}</p>
            <p className="text-xs text-slate-500">지역: {item.region}</p>
            <p className="text-xs text-slate-500">예산: {item.budget}</p>
            <p className="text-xs text-slate-500">메모: {item.memo}</p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
              >
                상태 변경
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
              >
                메모 수정
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
