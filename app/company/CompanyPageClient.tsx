// app/company/CompanyPageClient.tsx
'use client';

import { useState } from 'react';
import ContactModal from '@/components/contact/ContactModal';
import PartnerInquiryModal from '@/components/contact/PartnerInquiryModal';
import { SiteHeader } from '@/components/public/SiteHeader';
import { trackEvent } from '@/src/lib/ga';

type CompanyPageClientProps = {
  hotline: string;
  email: string;
};

export default function CompanyPageClient({
  hotline,
  email,
}: CompanyPageClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const openContact = () => {
    setIsContactOpen(true);
  };

  const openPartner = () => {
    setIsPartnerOpen(true);
    trackEvent('파트너문의_모달열림');
  };

  // 🔹 헤더에 표시할 사이트 이름 (비어 있으면 기본값)
  const siteName = 'JP Haven';

  return (
    <>
      {/* 🔹 공통 헤더: 로고 + 메뉴 + 로고 클릭 시 "/"로 이동 */}
      <SiteHeader siteName={siteName} />

      <main className="bg-white">
        {/* 상단 회사 소개 히어로 섹션 */}
        <section className="bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Giới thiệu về JP Haven
              </h1>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                JP Haven Memorial là nền tảng tang lễ số được xây dựng dựa trên
                kinh nghiệm quản lý tang lễ hơn 20 năm tại Hàn Quốc, kết hợp với
                thực tế văn hoá tang lễ tại Việt Nam. Chúng tôi mong muốn giúp
                các gia đình tìm kiếm thông tin nghĩa trang, nhà lưu tro cốt một
                cách minh bạch, dễ hiểu và nhân văn hơn.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <div className="rounded-lg bg-white shadow-sm px-4 py-3 border border-slate-100">
                  <div className="text-xs text-slate-500">Hotline</div>
                  <div className="font-semibold text-sky-700">{hotline}</div>
                </div>
                <div className="rounded-lg bg-white shadow-sm px-4 py-3 border border-slate-100">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="font-semibold text-slate-700">{email}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={openContact}
                  className="rounded-lg bg-sky-600 px-5 py-2 text-xs md:text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Gửi yêu cầu tư vấn
                </button>
                <button
                  type="button"
                  onClick={openPartner}
                  className="rounded-lg border border-sky-600 bg-white px-5 py-2 text-xs md:text-sm font-semibold text-sky-700 hover:bg-sky-50"
                >
                  Đăng ký đối tác nghĩa trang
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 회사 소개 상세 섹션 */}
        <section className="border-b border-slate-200">
          <div className="container mx-auto px-4 py-10 md:py-14 grid gap-8 md:grid-cols-2">
            <div className="space-y-3 text-sm md:text-base text-slate-700">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                Tầm nhìn của JP Haven
              </h2>
              <p>
                Chúng tôi mong muốn xây dựng một nền tảng nơi thông tin về
                nghĩa trang, hình thức an táng, chi phí và dịch vụ liên quan
                được trình bày rõ ràng, minh bạch và dễ so sánh, để gia đình có
                thể đưa ra quyết định trong giai đoạn khó khăn mà không bị áp
                lực.
              </p>
              <p>
                Thông qua JP Haven, chúng tôi kết nối giữa gia đình và các đơn
                vị vận hành nghĩa trang uy tín, với quy trình tư vấn được hỗ
                trợ bởi đội ngũ có kinh nghiệm thực tế tại cả Hàn Quốc và Việt
                Nam.
              </p>
            </div>
            <div className="space-y-3 text-sm md:text-base text-slate-700">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                Giá trị cốt lõi
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Minh bạch về thông tin và chi phí.</li>
                <li>
                  Tôn trọng văn hoá, tín ngưỡng và mong muốn của gia đình.
                </li>
                <li>
                  Kết hợp kinh nghiệm quản lý tang lễ Hàn Quốc với thực tế tại
                  Việt Nam.
                </li>
                <li>
                  Đồng hành với gia đình từ giai đoạn tư vấn tới sau khi an
                  táng.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 하단 B2B 파트너 섹션 */}
        <section className="bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Đối tác nghĩa trang
                </h2>
                <p className="text-sm md:text-base text-slate-700">
                  JP Haven là nền tảng giới thiệu và kết nối khách hàng cho các
                  nghĩa trang, công viên nghĩa trang và nhà lưu tro cốt tại Việt
                  Nam. Chúng tôi hỗ trợ xây dựng trang giới thiệu chuyên nghiệp
                  bằng tiếng Việt và tiếng Hàn, giúp đơn vị của anh/chị tiếp cận
                  thêm nhiều gia đình đang có nhu cầu thực tế.
                </p>
              </div>

              <div className="space-y-3 text-sm md:text-base text-slate-700">
                <h3 className="text-sm md:text-base font-semibold text-slate-900">
                  Lợi ích khi trở thành đối tác JP Haven
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Đăng thông tin nghĩa trang trên website JP Haven hoàn toàn
                    miễn phí trong giai đoạn đầu.
                  </li>
                  <li>
                    Hỗ trợ chụp và chỉnh sửa hình ảnh, viết nội dung giới thiệu
                    rõ ràng, dễ hiểu.
                  </li>
                  <li>
                    Tiếp cận khách hàng Việt Nam và Hàn Quốc đang sinh sống tại
                    Việt Nam.
                  </li>
                  <li>
                    Nhận yêu cầu tư vấn qua biểu mẫu, hotline, Zalo do JP Haven
                    chuyển tiếp.
                  </li>
                </ul>
              </div>

              <div className="space-y-3 text-sm md:text-base text-slate-700">
                <h3 className="text-sm md:text-base font-semibold text-slate-900">
                  Quy trình hợp tác đơn giản
                </h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Gửi thông tin đăng ký qua biểu mẫu đối tác.</li>
                  <li>
                    JP Haven liên hệ trao đổi chi tiết và (nếu cần) khảo sát
                    nghĩa trang.
                  </li>
                  <li>
                    Hoàn thiện trang giới thiệu và bắt đầu tiếp nhận khách hàng
                    mới qua JP Haven.
                  </li>
                </ol>
              </div>

              <div className="flex justify-center md:justify-start pt-2">
                <button
                  type="button"
                  onClick={openPartner}
                  className="rounded-lg bg-emerald-600 px-5 py-2 text-xs md:text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Đăng ký đối tác
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 기존 문의 모달 */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultEmail={email}
        source="company-contact-modal"
      />

      {/* B2B 파트너 문의 모달 */}
      <PartnerInquiryModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
        source="partner-inquiry-modal"
      />
    </>
  );
}
