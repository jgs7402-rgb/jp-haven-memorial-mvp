const mockHotline = {
  numberVi: '0xx xxx xxxx',
  numberKo: '0xx xxx xxxx',
  hours: '08:00 – 21:00 (Giờ Việt Nam)',
  zalo: 'https://zalo.me/xxxx',
  messageVi: 'Dịch vụ tư vấn do người Hàn Quốc vận hành',
  messageKo: '한국인이 운영하는 상담 서비스',
};

export default function AdminHotlinePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">Hotline 설정</p>
        <h1 className="text-2xl font-bold">연락처/운영시간/Zalo (mock)</h1>
        <p className="text-sm text-slate-500">
          자동 번역/저장 버튼은 자리만 있습니다.
        </p>
      </div>

      <form className="section-card border border-slate-200 p-6 shadow-soft rounded-xl space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Hotline (VI)
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue={mockHotline.numberVi}
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Hotline (KO)
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue={mockHotline.numberKo}
            />
          </label>
        </div>

        <label className="text-sm font-medium text-slate-700">
          운영시간
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            defaultValue={mockHotline.hours}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Zalo URL
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
            defaultValue={mockHotline.zalo}
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            안내 문구 (VI)
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue={mockHotline.messageVi}
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            안내 문구 (KO)
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              defaultValue={mockHotline.messageKo}
            />
          </label>
        </div>

        <div className="flex gap-3 pt-2">
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
      </form>
    </div>
  );
}
