const mockHomepageImages = [
  {
    id: 'hero',
    labelKo: '히어로 메인',
    labelVi: 'Hero chính',
    url: 'https://example.com/hero.jpg',
    altKo: '히어로 이미지',
    altVi: 'Hình ảnh hero',
  },
  {
    id: 'teaser-1',
    labelKo: '장지 티저 1',
    labelVi: 'Teaser nghĩa trang 1',
    url: 'https://example.com/teaser1.jpg',
    altKo: '티저 이미지 1',
    altVi: 'Hình teaser 1',
  },
  {
    id: 'testimonial-bg',
    labelKo: '후기 섹션 배경',
    labelVi: 'Nền mục testimonial',
    url: 'https://example.com/testimonials.jpg',
    altKo: '후기 배경',
    altVi: 'Nền testimonial',
  },
];

export default function AdminHomepageImagesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">메인 이미지</p>
        <h1 className="text-2xl font-bold">Hero/섹션 이미지 관리 (mock)</h1>
        <p className="text-sm text-slate-500">
          URL/alt(KO/VI) 입력과 미리보기, 저장 버튼 자리만 있습니다.
        </p>
      </div>

      <div className="space-y-4">
        {mockHomepageImages.map((item) => (
          <div
            key={item.id}
            className="section-card border border-slate-200 p-4 shadow-soft rounded-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{item.labelKo}</p>
                <p className="text-xs text-slate-500">{item.labelVi}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs hover:bg-slate-50"
              >
                미리보기
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Image URL
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  defaultValue={item.url}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Alt (KO)
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  defaultValue={item.altKo}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Alt (VI)
                <input
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                  defaultValue={item.altVi}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
              >
                자동 번역
              </button>
              <button
                type="button"
                className="rounded-lg bg-sky-600 px-4 py-2 text-white text-sm font-semibold shadow-soft hover:bg-sky-700"
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
