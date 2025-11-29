'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="/jangji">Nghĩa trang</a>
              </li>
              <li>
                <a href="/company">Giới thiệu công ty</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Liên hệ</h3>
            <p className="text-sm">Hotline: 0xx xxx xxxx</p>
            <p className="text-sm">Email: info@jphaven.com</p>
            <p className="text-sm">08:00 – 21:00 (Giờ Việt Nam)</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Mạng xã hội</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Zalo</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>Dịch vụ tư vấn do người Hàn Quốc vận hành</p>
        </div>
        <div className="mt-8 text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded">
            Logo chứng nhận (placeholder)
          </div>
        </div>
      </div>
    </footer>
  );
}
