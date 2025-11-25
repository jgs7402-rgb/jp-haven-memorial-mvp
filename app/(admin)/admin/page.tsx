const dashboardCards = [
  { title: '오늘 문의 수', value: '12', desc: '실시간 집계 (mock)' },
  { title: '이번 주 문의 수', value: '48', desc: '월~일 기준 (mock)' },
  { title: '등록된 장지 수', value: '18', desc: '북/중/남 합계 (mock)' },
  { title: '노출 중 메인 이미지', value: '6', desc: 'Hero/섹션 이미지 (mock)' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">Dashboard</p>
        <h1 className="text-2xl font-bold">요약 지표</h1>
        <p className="text-sm text-slate-500">모든 데이터는 현재 mock입니다.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="section-card border border-slate-200 p-4 shadow-soft rounded-xl"
          >
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
