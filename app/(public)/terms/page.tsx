// app/(public)/terms/page.tsx

import { getSiteSettings } from '@/src/lib/siteSettings';
import { SiteHeader } from '@/components/public/SiteHeader';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'Điều khoản sử dụng | JP Haven',
  description: 'Điều khoản sử dụng của JP Haven Memorial',
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteNameVi ?? 'JP Haven';

  // 🔹 기본 약관 텍스트 (지금 쓰고 있던 내용 그대로)
  const defaultTermsText = `JP Haven Memorial ("Website", "Chúng tôi") cung cấp nền tảng thông tin và kết nối dịch vụ nghĩa trang, nhà lưu tro cốt tại Việt Nam. Bằng việc truy cập và sử dụng Website này, bạn đồng ý tuân thủ các điều khoản sử dụng sau đây.

1. Mục đích sử dụng

Website cung cấp thông tin về các nghĩa trang, công viên nghĩa trang và nhà lưu tro cốt tại Việt Nam. Chúng tôi hoạt động như một nền tảng trung gian kết nối giữa gia đình và các đơn vị vận hành nghĩa trang, không trực tiếp bán sản phẩm hoặc dịch vụ tang lễ.

2. Thông tin trên Website

Tất cả thông tin trên Website được cung cấp với mục đích tham khảo. Chúng tôi nỗ lực đảm bảo tính chính xác của thông tin, tuy nhiên không đảm bảo hoàn toàn về tính đầy đủ, chính xác hoặc cập nhật của mọi thông tin.

3. Quyền và trách nhiệm của người dùng

Người dùng có trách nhiệm sử dụng Website một cách hợp pháp và phù hợp với mục đích. Không được sử dụng Website cho bất kỳ mục đích bất hợp pháp nào hoặc gây tổn hại đến quyền lợi của bên thứ ba.

4. Liên kết đến bên thứ ba

Website có thể chứa liên kết đến các website của bên thứ ba. Chúng tôi không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc thực hành của các website bên thứ ba này.

5. Thay đổi điều khoản

Chúng tôi có quyền thay đổi các điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng Website sau khi có thay đổi được coi là bạn đã chấp nhận các điều khoản mới.

6. Liên hệ

Nếu bạn có câu hỏi về các điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua thông tin liên hệ được cung cấp trên Website.`;

  // 🔹 어드민에서 입력한 값이 있으면 그걸 쓰고, 없으면 기본 텍스트 사용
  const termsText = settings?.termsContentVi ?? defaultTermsText;

  const paragraphs = termsText.split('\n\n').filter((p) => p.trim());

  return (
    <>
      <SiteHeader siteName={siteName} />
      <main className="bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h1 className="mb-6 text-3xl font-bold">ĐIỀU KHOẢN SỬ DỤNG</h1>
          <div className="prose max-w-none text-sm leading-relaxed text-slate-800">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
