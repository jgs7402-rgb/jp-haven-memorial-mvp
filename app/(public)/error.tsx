'use client';

export default function PublicError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 text-center px-6 text-slate-900">
      <p className="text-sm text-gray-500">Đã xảy ra lỗi</p>
      <h1 className="text-2xl font-semibold text-gray-900">
        Trang đang gặp sự cố
      </h1>
      <p className="text-gray-600 text-sm max-w-md">
        {error?.message || 'Vui lòng thử lại hoặc quay lại trang chủ.'}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg"
        >
          Tải lại
        </button>
        <a
          href="/"
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg inline-block"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  );
}
