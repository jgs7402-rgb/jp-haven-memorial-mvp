export default function SettingsAdminPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">사이트 설정 (Settings)</h1>
      <p className="text-sm text-gray-600">
        이 페이지에서 Hotline, 이메일, 운영시간, 메인 히어로 텍스트, Footer 문구 및 SNS 링크를 관리할 예정입니다.
      </p>

      <div className="rounded-lg border border-dashed border-gray-300 bg-white/50 p-6 text-sm text-gray-500">
        아직 설정 폼은 구현되지 않았습니다. 다음 단계에서 Supabase site_settings
        테이블과 연동하여 실제 입력 폼을 추가할 예정입니다.
      </div>
    </main>
  );
}
