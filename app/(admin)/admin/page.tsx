import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">어드민 대시보드</h1>
      <p className="text-sm text-gray-600">
        아래에서 장지 데이터와 사이트 공통 설정을 관리할 수 있습니다.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/cemeteries"
          className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold mb-1">장지 관리</h2>
          <p className="text-sm text-gray-600">
            장지 목록, 활성 여부, 메인 추천 노출, 이미지 URL 등을 관리합니다.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          <h2 className="font-semibold mb-1">사이트 설정</h2>
          <p className="text-sm text-gray-600">
            Hotline, 이메일, 운영시간, 메인 히어로 텍스트, Footer 문구 및 SNS 링크를 관리합니다.
          </p>
        </Link>
      </div>
    </div>
  );
}




