JP Haven Memorial – Product & Tech Specification (MVP v1)
1. 서비스 개요

JP Haven Memorial은 베트남 현지의 장지(납골당/공원묘원 등) 정보와 장례/장지 컨설팅을 투명하고 차분하게 제공하는 웹 서비스입니다.
한국 장례업 경험과 베트남 현지 네트워크를 결합하여, 베트남 고객과 한국 장례 전문가를 잇는 **“장례·장지 매칭/컨설팅 플랫폼”**을 목표로 합니다.

1.1 해결하고 싶은 문제(Problem Statement)

베트남에서 장지(납골당/공원묘원 등) 정보가 산발적이고 불투명함.

위치, 가격, 관리비, 시설 정보 등이 업체 중심으로만 제공되거나 구전(입소문)에 의존.

유가족 입장에서는 비교/검토가 어렵고, 급박한 상황에서 불리한 조건으로 계약하는 경우 많음.

한국에서 장례 경험이 있는 교민/가족이 베트남에서 장례를 준비할 때,

언어/문화/제도 차이로 인해 정보 탐색이 매우 어려움.

신뢰할 수 있는 현지 파트너/장례업체를 찾기가 어려움.

장례/장지 관련 의사결정은 본질적으로 감정적으로도 힘든 일인데,

정보 비대칭과 불투명한 가격 구조 때문에 추가적인 불안·불신이 쌓이는 상황.

JP Haven Memorial의 핵심 목표는
“차분하고 투명하게 가족과 함께 장지 선택을 도와주는 것”입니다.

1.2 핵심 컨셉 & 벤치마킹

UI/UX는 아래와 같은 국내 서비스들을 벤치마킹했습니다.

토스(Toss):

군더더기 없이 깨끗한 레이아웃,

큰 타이포 + 적절한 여백 + 카드형 인터랙션을 적극 활용.

야놀자(Yanolja):

숙소/여행지 정보를 카드를 통해 보여주고,

“위치 / 사진 / 가격 / 옵션” 등을 한눈에 비교하기 쉽게 정리하는 패턴.

이 두 가지를 장례/장지 도메인에 맞게 재해석하여:

밝고 차분한 컬러(화이트/블루/그레이)

카드형 레이아웃 + 부드러운 그림자(입체감)

“과도한 화려함” 대신 신뢰감·안정감을 주는 톤앤매너

를 기본 디자인 방향으로 설정했습니다.

2. 주요 기능/페이지 구조
2.1 공개 페이지 (Public Routes)
/ – 메인 랜딩 페이지

구성 요소:

Hero 섹션

베트남어 기반 메인 카피:

제목: “Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.”
(차분하고 투명하게 마지막 안식처를 선택하자는 메시지)

부제: 한국 장례 전문가가 베트남 가족을 돕는다는 신뢰 메시지.

3개의 주요 CTA 버튼:

“Gọi tư vấn ngay!” – 즉시 전화 상담

“Để lại thông tin tư vấn!!” – 문의 폼으로 이동/스크롤

“Chat qua Zalo!!!” – Zalo OA 링크(https://zalo.me/3258467487025854421)로
 연결
→ Zalo 상담 중심인 베트남 고객 행동 패턴을 반영.

Hotline & 안내문구

Supabase site_settings에서 불러오는 값:

hotline_number: 전화 번호(한국/베트남 번호 병기 가능)

business_hours_text: 운영 시간 (예: 07:30 – 22:00 (Giờ Việt Nam))

hotline_notice_vi: 베트남어 안내문구 (운영 시간, Zalo/이메일 안내 등)

Hero 아래에 카드형 인포 박스로 표시:

예: 무료 상담, 비용 투명 설명, 정보 보호 등 3개의 bullet point를 아이콘과 함께 노출

토스·야놀자 스타일의 부드러운 카드 + 그림자 효과 적용.

추천 장지(Featured Cemeteries)

Supabase cemeteries 테이블을 기반으로 일부 장지를 선정하여 카드 슬라이드 형태로 노출.

각 카드: 사진, 이름, 위치(지역), 간단 설명 등.

고객 후기(Testimonials)

Supabase homepage_testimonials에서 가져온 베트남어 후기 노출.

“서비스를 이용한 고객의 실제 평가”를 카드 형태로 나열 (후기 내용 + 메타정보).

문의 폼(Inquiry Form)

필드:

Họ và tên (이름) – 필수

Số điện thoại (전화번호) – 필수

Khu vực mong muốn (희망 지역)

Ngân sách dự kiến (예산)

Ghi chú khác (기타 메모/문의 내용)

제출 시:

Supabase public.inquiries 테이블에 저장

submitInquiry 서버 액션 + Supabase insert (createInquiry) 연동

DB 저장 성공 시:

클라이언트에 베트남어 안내 문구:

“Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại sớm nhất có thể.”

폼 리셋 (현재는 reset 없이 값 유지/또는 리셋, 상황에 맞게 조정 가능)

향후: 이메일 발송(알림) 기능 붙이기 용 sendInquiryEmail 준비되어 있음(현재 설정 미완료 시에도 저장은 유지).

/jangji – 장지 목록/탐색 페이지

Supabase cemeteries 테이블을 목록으로 보여주는 페이지.

카드 레이아웃:

사진 썸네일

장지 이름

위치(지역/도시)

간단 설명

클릭 시 /jangji/[id]로 이동.

/jangji/[id] – 장지 상세 페이지

Supabase cemeteries 및 연관 이미지 테이블(cemetery_image)에서 데이터를 가져오고, 다음 정보를 표시:

메인 이미지 + 서브 이미지

장지 이름

상세 설명(장점/환경/서비스 특징)

위치 정보(도시/지역)

가격/관리비 관련 기본 정보(추후 더 정교하게 확장 가능)

Google Maps Embed

전달받은 좌표/주소를 기반으로 iframe으로 지도 표시.

쿼리 파라미터에 hl=vi, region=VN을 포함해 베트남어 UI로 표시.

다른 CTA(예: “이 장지로 문의하기”)를 통해 메인 문의 플로우와 연결 가능.

/company – 회사 소개(베트남어) 페이지

목적: 브랜드 신뢰/정체성 전달

구성:

회사 소개(Who we are)

미션/비전 (왜 이 일을 하는지)

주요 서비스(서비스 구조, 한국–베트남 연계 컨설팅)

구체적인 고객 혜택 (비용 투명성, 비교/분석 리포트 제공 등)

하단 CTA(예: “상담 요청”, “Zalo로 문의”)

UI/UX:

메인 텍스트는 max-w-3xl 정도의 너비로 중앙 정렬, text-base + leading-relaxed로 가독성 강화.

각 섹션을 카드형 레이아웃으로 배치:

rounded-xl, border border-slate-200, bg-white, shadow-sm, p-6 등 메인 페이지와 동일한 스타일.

하단에 두 개의 CTA 버튼:

메인 페이지 CTA와 톤앤매너 통일(파란 버튼 + 테두리 버튼 조합).

상단 타이틀/로고 “JP Haven Memorial” 클릭 시 홈(/)으로 이동.

2.2 어드민 콘솔 (Admin Routes)

모든 어드민 UI는 한국어 기반으로 설계되었으며, 장례/장지/컨설팅 운영자가 하루에도 수십 번 열어보는 화면임을 전제로 “정보 밀도는 높되, 정신없이 복잡하지 않게” 디자인합니다.

/admin/login

어드민 로그인 페이지

ID/PW 기반 로그인 (현재는 Supabase Auth 또는 커스텀 인증 로직과 연동)

개발용 자격증명 안내 문구는 배포 전 제거(완료) – 보안 상 이유.

/admin – 대시보드

간단한 환영 문구 + 좌측 사이드바 메뉴:

문의 관리

장지 데이터

고객 후기 관리 (기존 “메인 이미지”에서 이름 변경)

/admin/inquiries – 문의 관리

핵심 운영 화면.
Supabase public.inquiries를 기반으로, 들어온 고객 문의를 한눈에 보고 상태/메모를 관리합니다.

데이터 구조 (public.inquiries):

id: PK

name, phone, email

region, budget

note: 고객이 남긴 문의/설명

message: (추후 확장용)

source: "inquiry-form" 등 소스 구분용

status: "new" | "in_progress" | "done"

memo: 운영자 내부 메모

created_at, updated_at

UI 기능:

테이블 뷰

컬럼: ID, 이름, 전화번호, 지역, 예산, 상태, 메모, 생성일

상태 변경:

<select> 또는 버튼으로 신규(new) / 진행중(in_progress) / 완료(done) 전환

서버 액션 + updateInquiryStatus 를 통해 public.inquiries.status 업데이트

메모 수정:

“메모 수정” 인터랙션을 통해 memo 필드 업데이트 (updateInquiryMemo + API route)

카드 뷰

테이블/카드 토글 버튼 (viewMode: 'table' | 'card')

카드 구성:

헤더: 이름, 전화번호, 상태 배지(색상으로 구분 – green/blue/gray)

메타 정보: 지역, 예산, 생성일

문의 내용(note/message)을 whitespace-pre-wrap, max-h, overflow-y-auto 등으로 가독성 있게 표시

메모/내부 코멘트도 함께 표시

가독성을 위해 토스 스타일의 “section-card + shadow-soft” 패턴 재사용.

/admin/settings – 사이트 설정

**전역 설정(Site Settings)**을 관리하는 화면입니다.
Supabase public.site_settings 테이블의 단일 row (id = 1)와 연동됩니다.

탭/섹션 구성:

연락처

Hotline 번호 (hotline_number)

영업 시간 텍스트 (business_hours_text)

문의 이메일 (support_email)

Hotline 안내문구 (VI) (hotline_notice_vi)

메인 히어로 (Hero)

히어로 제목/부제/CTA 문구 (VI)

Footer & SNS

Footer 메시지(VI), Zalo URL, Facebook URL, 사이트 이름 등

SEO & 공유 설정 (SEO & OG)

기본 메타 타이틀(VI), 설명(VI)

기본 OG 타이틀/설명(VI):

SNS/메신저 공유 시 링크 미리보기 제목·설명

기본 OG 이미지 URL:

대표 썸네일 이미지 URL (예: Supabase Storage에 올린 메인 사진)

OG 이미지 대체 텍스트(VI):

이미지 설명 텍스트 (접근성 용도)

모든 필드 변경은 updateSiteSettings 서버 액션을 통해 site_settings 테이블에 저장되며, 메인/공개 페이지에서 공통적으로 참조됩니다.

/admin/homepage-images – 고객 후기 관리

기존 “메인 이미지” 페이지를 “고객 후기 관리”로 리네이밍.

Supabase homepage_testimonials 테이블을 사용하여:

후기 내용(VI)

메타 정보(예: “Con trai, 35 tuổi – Hà Nội”)

정렬 순서

메인 노출 여부 등 관리

메인 페이지의 Testimonials 섹션과 연동.

/admin/jangji – 장지 데이터 관리

Supabase cemeteries, cemetery_image 테이블을 기반으로:

장지명/설명/위치/옵션 등을 CRUD

장지별 이미지 업로드/삭제/정렬

3. Tech Stack & 구조

Next.js 14 (App Router) + TypeScript

app/ 디렉터리 기반 라우팅

Server Components + Server Actions 활용

Supabase

Postgres DB

Auth (추후 확장)

Storage (이미지/OG 이미지 등)

Tailwind CSS

빠른 UI 개발 + 토스/야놀자 스타일 카드/레이아웃 구현

Vercel (예정)

빌드/배포 자동화

환경 변수: Supabase URL/Key, Site URL 등

4. 향후 확장 계획 – Region-specific Hotlines (미구현)

기획 방향 (이미 README에 요약된 내용)

현재:

site_settings.hotline_number, hotline_notice_vi가 전역 공통 설정.

향후:

북부 / 중부 / 남부 등 지역별로 서로 다른 Hotline/안내문구를 설정할 수 있는 기능 추가.

예시:

hotlines 테이블:

region_code (north, central, south)

hotline_number, business_hours_text, hotline_notice_vi/ko 등

/jangji / 상세 페이지에서:

장지의 region에 따라 자동으로 해당 지역 Hotline/안내문구 표시.

/admin/settings 또는 별도 메뉴에서:

지역별 Hotline/안내문구 관리 UI 제공.

현재는 MVP 단계이므로:

전역 공통 Hotline 설정만 지원
(global site_settings 기반)

이후, 실사용 데이터/운영 상황을 보며 단계적으로 스키마와 UI를 확장할 계획입니다.