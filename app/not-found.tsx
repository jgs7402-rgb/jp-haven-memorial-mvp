export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 text-center px-6 text-slate-900">
      <p className="text-sm text-gray-500">404</p>
      <h1 className="text-2xl font-semibold text-gray-900">
        Không tìm thấy trang
      </h1>
      <p className="text-gray-600 text-sm max-w-md">
        Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-sky-600 text-white rounded-lg inline-block"
      >
        Về trang chủ
      </a>
    </div>
  );
}
