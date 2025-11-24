export default function HomePage() {
  return (
    <main>
      {/* 헤더 */}
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">JP Haven Memorial</div>
          <nav className="flex gap-6">
            <a href="/jangji">장지 안내</a>
            <a href="/company">회사 소개</a>
          </nav>
          <div className="text-sm">Hotline: 0xx xxx xxxx</div>
        </div>
      </header>

      {/* Hero 섹션 */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Dịch vụ tư vấn do người Hàn Quốc vận hành, hỗ trợ gia đình Việt Nam hiểu rõ chi phí và lựa chọn trước khi ra nghĩa trang.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="tel:0xxxxxxxxx" className="px-6 py-3 bg-sky-600 text-white rounded-lg">
            Gọi tư vấn ngay
          </a>
          <a href="#inquiry" className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg">
            Để lại thông tin tư vấn
          </a>
          <a href="#" className="px-6 py-3 bg-white text-sky-600 border border-sky-600 rounded-lg">
            Chat qua Zalo
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Hotline: 0xx xxx xxxx · 08:00 – 21:00 (Giờ Việt Nam)
        </p>
      </section>

      {/* 장지 티저 섹션 */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Nghĩa trang nổi bật</h2>
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* 장지 카드 placeholder */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-semibold mb-2">장지 이름</h3>
            <p className="text-sm text-gray-600">장지 종류</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-semibold mb-2">장지 이름</h3>
            <p className="text-sm text-gray-600">장지 종류</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="font-semibold mb-2">장지 이름</h3>
            <p className="text-sm text-gray-600">장지 종류</p>
          </div>
        </div>
        <div className="text-center">
          <a href="/jangji" className="px-6 py-3 bg-sky-600 text-white rounded-lg inline-block">
            Xem tất cả
          </a>
        </div>
      </section>

      {/* 고객 후기 캐러셀 섹션 */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Khách hàng nói gì</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* 후기 카드 placeholder */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">후기 내용...</p>
            <p className="text-sm text-gray-500">Con trai, 35 tuổi · TP.HCM</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">후기 내용...</p>
            <p className="text-sm text-gray-500">Con trai, 35 tuổi · TP.HCM</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">후기 내용...</p>
            <p className="text-sm text-gray-500">Con trai, 35 tuổi · TP.HCM</p>
          </div>
        </div>
      </section>

      {/* 문의하기 폼 섹션 */}
      <section id="inquiry" className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Để lại thông tin tư vấn</h2>
        <form className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Họ và tên *</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Số điện thoại *</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Khu vực mong muốn</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Ngân sách dự kiến</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Ghi chú khác</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-sky-600 text-white rounded-lg"
          >
            Gửi thông tin
          </button>
        </form>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-100 py-12 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">메뉴</h3>
              <ul className="space-y-2">
                <li><a href="/jangji">장지 안내</a></li>
                <li><a href="/company">회사 소개</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">연락처</h3>
              <p className="text-sm">Hotline: 0xx xxx xxxx</p>
              <p className="text-sm">Email: info@jphaven.com</p>
              <p className="text-sm">08:00 – 21:00 (Giờ Việt Nam)</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">소셜</h3>
              <ul className="space-y-2">
                <li><a href="#">Zalo</a></li>
                <li><a href="#">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>Dịch vụ tư vấn do người Hàn Quốc vận hành</p>
          </div>
          <div className="mt-8 text-center">
            {/* FooterBadge placeholder */}
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded">
              공공기관 인증 로고 (placeholder)
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
