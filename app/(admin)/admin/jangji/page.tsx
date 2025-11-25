const mockCemeteries = [
  {
    id: 1,
    nameKo: '빈즈엉 공원묘지',
    nameVi: 'Nghĩa trang Bình Dương',
    region: 'Nam',
    typeKo: '공원묘지',
    typeVi: 'Công viên nghĩa trang',
  },
  {
    id: 2,
    nameKo: '마이직 납골당',
    nameVi: 'Nghĩa trang Mai Dịch',
    region: 'Bắc',
    typeKo: '납골당',
    typeVi: 'Nhà columbarium',
  },
  {
    id: 3,
    nameKo: '다낭 수목원',
    nameVi: 'Nghĩa trang Đà Nẵng',
    region: 'Trung',
    typeKo: '수목원',
    typeVi: 'Công viên cây xanh',
  },
];

export default function AdminJangjiPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">장지 데이터</p>
        <h1 className="text-2xl font-bold">북/중/남 장지 관리 (mock)</h1>
        <p className="text-sm text-slate-500">
          KO/VI 필드와 자동 번역, 저장 버튼 자리만 있습니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockCemeteries.map((item) => (
          <div
            key={item.id}
            className="section-card border border-slate-200 p-4 shadow-soft rounded-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{item.nameKo}</p>
              <span className="text-xs rounded-full bg-slate-100 px-2 py-1 text-slate-700">
                {item.region}
              </span>
            </div>
            <p className="text-xs text-slate-500">VI: {item.nameVi}</p>
            <p className="text-xs text-slate-500">
              유형: {item.typeKo} / {item.typeVi}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
              >
                자동 번역
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
              >
                저장(mock)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
