// app/company/CompanyPageClient.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import ContactModal from '@/components/contact/ContactModal';

type Props = {
  hotline: string;
  email: string;
};

export default function CompanyPageClient({ hotline, email }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const effectiveHotline = hotline?.trim() ?? '';
  const effectiveEmail = email?.trim() ?? '';

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-12">
          {/* Phần đầu trang */}
          <header className="space-y-4">
            {/* 제목 클릭 시 홈으로 이동 */}
            <Link
              href="/"
              className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-sky-600 hover:text-sky-700"
            >
              JP Haven Memorial
            </Link>

            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Giới thiệu công ty
            </h1>
            <p className="text-base leading-relaxed text-slate-800">
              JP Haven Memorial là nền tảng tang lễ số giúp gia đình tại Việt
              Nam chuẩn bị tang lễ một cách nhẹ nhàng và rõ ràng hơn. Chúng tôi
              kết hợp kinh nghiệm quản lý tang lễ từ Hàn Quốc với văn hoá tang
              lễ tại Việt Nam, để hỗ trợ các bước như tạo cáo phó online, lựa
              chọn nghĩa trang, đặt hoa – vòng hoa, bình tro cốt và bàn thờ…
              trên cùng một nền tảng.
            </p>
          </header>

          {/* Sứ mệnh / Tầm nhìn */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="section-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-slate-900">Sứ mệnh</h2>
              <p className="text-base leading-relaxed text-slate-800">
                Trong khoảnh khắc phải chia tay người thân, gia đình không nên
                bị áp lực thêm bởi thủ tục rối rắm và giấy tờ phức tạp. Sứ mệnh
                của chúng tôi là làm cho toàn bộ quá trình chuẩn bị tang lễ trở
                nên đơn giản, minh bạch và dễ hiểu hơn cho mọi người.
              </p>
            </div>
            <div className="section-card p-6 space-y-3">
              <h2 className="text-base font-semibold text-slate-900">Tầm nhìn</h2>
              <p className="text-base leading-relaxed text-slate-800">
                Cùng với các nhà tang lễ, nghĩa trang và đơn vị cung cấp hoa tại
                Việt Nam, JP Haven Memorial hướng tới trở thành nền tảng tư vấn
                và thông tin tang lễ đáng tin cậy nhất, nơi gia đình có thể tìm
                thấy thông tin rõ ràng và hỗ trợ tận tâm.
              </p>
            </div>
          </section>

          {/* Dịch vụ chính */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              Dịch vụ chính
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="section-card p-6 space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Cáo phó số &amp; thông tin nghĩa trang
                </h3>
                <p className="text-base leading-relaxed text-slate-800">
                  Chỉ với một đường link, gia đình có thể gửi cáo phó, chia sẻ
                  thời gian – địa điểm viếng và thông tin nghĩa trang cho người
                  thân, bạn bè. Mọi người có thể xem trên điện thoại và dễ dàng
                  chia sẻ lại cho người khác.
                </p>
              </div>
              <div className="section-card p-6 space-y-3">
                <h3 className="text-base font-semibold text-slate-900">
                  Gợi ý nghĩa trang &amp; tư vấn tại địa phương
                </h3>
                <p className="text-base leading-relaxed text-slate-800">
                  Chúng tôi tổng hợp thông tin nghĩa trang tại khu vực Bắc –
                  Trung – Nam, và gợi ý dựa trên ngân sách, khoảng cách, môi
                  trường xung quanh… Tùy theo nhu cầu, gia đình có thể được kết
                  nối với đơn vị đối tác tại địa phương để được tư vấn trực
                  tiếp.
                </p>
              </div>
            </div>
          </section>

          {/* Liên hệ / Hợp tác */}
          <section className="section-card p-6 space-y-4 bg-sky-50/50">
            <h2 className="text-base font-semibold text-slate-900">
              Liên hệ &amp; Hợp tác
            </h2>
            <p className="text-base leading-relaxed text-slate-800">
              Chúng tôi luôn sẵn sàng hợp tác với nhà tang lễ, đơn vị quản lý
              nghĩa trang, nhà cung cấp hoa – vòng hoa, đơn vị sản xuất bình
              tro cốt và bàn thờ… để cùng xây dựng dịch vụ phù hợp với gia đình
              tại Việt Nam.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-800">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-sky-200">
                Hotline (VN):{' '}
                {effectiveHotline !== '' ? effectiveHotline : 'Đang cập nhật'}
              </span>
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-sky-200">
                Email:{' '}
                {effectiveEmail !== '' ? effectiveEmail : 'Đang cập nhật'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-sky-700"
              >
                Về trang chủ
              </Link>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-soft hover:bg-sky-50"
              >
                Chuyển tới trang liên hệ
              </button>
            </div>
          </section>
        </section>
      </main>

      {/* 공통 문의 모달 재사용 */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultEmail={effectiveEmail}
        action="/api/contact"
        source="company-page-modal"
      />
    </>
  );
}
