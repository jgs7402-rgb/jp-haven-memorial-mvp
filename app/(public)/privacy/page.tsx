// app/(public)/privacy/page.tsx

import { getSiteSettings } from '@/src/lib/siteSettings';
import { SiteHeader } from '@/components/public/SiteHeader';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'Chính sách bảo mật | JP Haven',
  description: 'Chính sách bảo mật của JP Haven Memorial',
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteNameVi ?? 'JP Haven';

  // 🔹 기본 개인정보 처리방침 텍스트 (지금 쓰고 있던 내용 그대로)
  const defaultPrivacyText = `JP Haven Memorial ("Website", "Chúng tôi") cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi sử dụng Website.

1. Thông tin chúng tôi thu thập

Chúng tôi có thể thu thập các thông tin sau khi bạn sử dụng Website:
- Thông tin cá nhân: Họ tên, số điện thoại, địa chỉ email, địa chỉ liên hệ
- Thông tin kỹ thuật: Địa chỉ IP, loại trình duyệt, thiết bị truy cập
- Thông tin sử dụng: Trang bạn truy cập, thời gian truy cập, liên kết bạn nhấp vào

2. Mục đích sử dụng thông tin

Chúng tôi sử dụng thông tin thu thập được để:
- Cung cấp và cải thiện dịch vụ tư vấn
- Liên hệ với bạn để phản hồi yêu cầu tư vấn
- Gửi thông tin về dịch vụ (nếu bạn đồng ý)
- Phân tích và cải thiện trải nghiệm người dùng
- Tuân thủ các nghĩa vụ pháp lý

3. Bảo vệ thông tin

Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, không có phương thức truyền tải qua Internet nào là hoàn toàn an toàn.

4. Chia sẻ thông tin

Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ:
- Khi có yêu cầu từ cơ quan pháp luật
- Khi cần thiết để cung cấp dịch vụ bạn yêu cầu (ví dụ: chuyển tiếp thông tin đến nghĩa trang bạn quan tâm)
- Với sự đồng ý của bạn

5. Quyền của người dùng

Bạn có quyền:
- Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình
- Từ chối việc thu thập hoặc sử dụng thông tin của bạn
- Rút lại sự đồng ý đã cung cấp trước đó

6. Cookie và công nghệ theo dõi

Website có thể sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm người dùng và phân tích lưu lượng truy cập. Bạn có thể điều chỉnh cài đặt trình duyệt để từ chối cookie.

7. Thay đổi chính sách

Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên trang này.

8. Liên hệ

Nếu bạn có câu hỏi hoặc yêu cầu về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua thông tin liên hệ được cung cấp trên Website.`;

  // 🔹 어드민에서 입력한 값이 있으면 그걸 쓰고, 없으면 기본 텍스트 사용
  const privacyText = settings?.privacyContentVi ?? defaultPrivacyText;

  const paragraphs = privacyText.split('\n\n').filter((p) => p.trim());

  return (
    <>
      <SiteHeader siteName={siteName} />
      <main className="bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h1 className="mb-6 text-3xl font-bold">CHÍNH SÁCH BẢO MẬT</h1>
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
