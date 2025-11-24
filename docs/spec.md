# JP Haven Memorial Web App Spec (MVP)

타깃: 베트남 사용자 (일반 유저)  
운영/관리: 한국인/베트남인 어드민  
언어:  
- 공개 웹: 기본 베트남어 (필요 시 한국어 보조 텍스트)  
- 어드민: 한국어 UI + 베트남어 콘텐츠 필드

기술 스택:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (DB + Auth)
- 배포: Vercel (예정)
- GitHub + GitKraken, Codex + Cursor로 개발

---

## 1. 라우트 구조

### 1.1 Public Routes (베트남 사용자용)

- `/`  
  - 메인 랜딩 페이지  
  - 섹션:
    - 헤더 (로고, 메뉴, 작은 Hotline 텍스트)
    - Hero 섹션 (헤드라인 + 서브텍스트 + CTA 버튼 3개)
    - 장지 티저 섹션 (카드 몇 개 + "Xem tất cả" 버튼)
    - 고객 후기 캐러셀 섹션 (8개 중 3개씩 자동 슬라이드)
    - 문의하기 폼 섹션 (이름/전화/희망지역/예산)
    - 푸터 (확장형, 공공기관 파란 딱지 영역 포함)

- `/jangji`  
  - 장지 안내 페이지  
  - 북부/중부/남부 탭 + SVG 지도 인터랙션 + 장지 카드 리스트

- `/company`  
  - 회사 소개 페이지  
  - 대표 인사말 (위: 베트남어 / 아래: 영어)  
  - 회사 철학 + 연락처

### 1.2 Admin Routes (어드민 – 한국어 UI)

- `/admin/login`
  - 로그인 폼
  - dev용 기본 계정:  
    - ID: `admin`  
    - PW: `cho342020`
  - (실서비스 시에는 별도 보안 설계 필요)

- `/admin`  
  - 대시보드  
  - 카드:
    - 오늘 문의 수
    - 이번 주 문의 수
    - 등록된 장지 수
    - 노출 중 메인 이미지 수

- `/admin/inquiries`  
  - 문의 내역 관리  
  - 리스트 + 상태 변경 + 내부 메모(한국어)

- `/admin/jangji`  
  - 장지 데이터 관리 (북/중/남 18개 샘플 포함)  
  - 한국어/베트남어 필드 동시 표시 + 자동 번역 버튼

- `/admin/hotline`  
  - Hotline/운영시간/Zalo 설정  
  - 베트남어/한국어 안내 문구 필드

- `/admin/homepage-images`  
  - 메인 페이지 Hero/섹션 이미지 관리  
  - 이미지 키 + URL + alt 텍스트(KO/VI)

---

## 2. 메인 페이지 상세 스펙

### 2.1 헤더

- 좌측: 로고
- 중앙: 메뉴 링크
  - 장지 안내 (`/jangji`)
  - 회사 소개 (`/company`)
- 우측: 작은 "Hotline" 텍스트 링크
  - 예: `Hotline: 0xx xxx xxxx`

### 2.2 Hero 섹션 (베트남어 카피 예시)

- 헤드라인:  
  > `Chọn nơi an nghỉ cuối cùng một cách bình tĩnh và minh bạch.`

- 서브텍스트:  
  > `Dịch vụ tư vấn do người Hàn Quốc vận hành, hỗ trợ gia đình Việt Nam hiểu rõ chi phí và lựa chọn trước khi ra nghĩa trang.`

- CTA 버튼:
  - `[Gọi tư vấn ngay]` → `tel:` 링크
  - `[Để lại thông tin tư vấn]` → 문의 폼으로 스크롤
  - `[Chat qua Zalo]` → Zalo 링크

- 하단 작은 텍스트:
  - `Hotline: 0xx xxx xxxx · 08:00 – 21:00 (Giờ Việt Nam)`

### 2.3 장지 티저 섹션

- 야놀자 호텔 카드 느낌의 카드 2~3개
  - 대표 사진
  - 장지 이름
  - 장지 종류 아이콘
- "Xem tất cả" 버튼 → `/jangji`

### 2.4 고객 후기 캐러셀

- 총 8개 후기 데이터 (베트남어 문장)
- 화면에는 한 번에 3개 카드 노출
- 자동 슬라이드 (3초~5초 간격)
- 카드 구성:
  - 후기 내용(짧은 베트남어)
  - 관계/연령/지역 한 줄 (예: "Con trai, 35 tuổi · TP.HCM")

### 2.5 문의하기 폼 섹션

필드:

- `Họ và tên` (이름) – 필수
- `Số điện thoại` (전화번호) – 필수
- `Khu vực mong muốn` (장지 희망 지역, 자유 텍스트) – 선택
- `Ngân sách dự kiến` (예산 범위, 자유 텍스트) – 선택
- (옵션) `Ghi chú khác` (기타 메모)

동작:

- 제출 시 Supabase `inquiries` 테이블에 저장
- 성공 시 짧은 안내 메시지 표시
- 어드민 `/admin/inquiries`에서 관리

### 2.6 푸터 (확장형 설계)

3단 구조:

1. **상단: 링크 영역**
   - 주요 메뉴 링크
   - 소셜 링크(Zalo, Facebook 등)

2. **중단: 정보 영역**
   - 회사명, Hotline, Email, 운영시간
   - 짧은 문구 (예: "Dịch vụ tư vấn do người Hàn Quốc vận hành")

3. **하단: 인증/뱃지 영역 (파란 딱지 슬롯)**
   - `FooterBadge` 리스트 기반 렌더링
   - 지금은 placeholder만, 나중에 베트남 공공기관 인증 로고 추가

데이터 타입 예시:

```ts
type FooterBadge = {
  id: string;
  label_vi: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
};
3. 장지 안내 페이지 스펙 (/jangji)
3.1 지역 분류 & 지도 인터랙션

상단 탭:

Bắc (북부)

Trung (중부)

Nam (남부)

중앙: 베트남 SVG 지도

북부/중부/남부 영역을 구분된 path로 구현

hover 시 영역 하이라이트

click 시 해당 region 필터 적용

3.2 장지 리스트

각 region별 최소 6개 샘플 (총 18개)

카드 구성:

대표 사진

추가 사진 3~7장 그리드

장지 이름

장지 종류

납골당, 공원묘지, 수목원, 사찰, 기타

주소 (시/군급 + 간단 설명)

장점/단점 요약 텍스트

전화번호는 노출하지 않음
→ 문의는 메인 문의 폼/핫라인으로 유도
4. 회사 소개 페이지 스펙 (/company)
4.1 대표 인사말

위: 베트남어

아래: 영어

베트남어 예시:

Tại JP Haven Memorial, chúng tôi đồng hành cùng gia đình Việt Nam trong việc chọn nơi an nghỉ cuối cùng một cách rõ ràng và trân trọng. Dịch vụ được sáng lập và vận hành bởi một người Hàn Quốc đang sinh sống tại Việt Nam, với mong muốn chia sẻ kinh nghiệm thực tế về văn hoá tang lễ và cách làm việc minh bạch.

영어 예시:

JP Haven Memorial is founded and operated by a Korean founder living in Vietnam. Our mission is to support Vietnamese families in choosing a final resting place with clarity and respect, by sharing practical experience from Korean funeral culture and applying it transparently in the local context.

4.2 기타

팀 소개 없음

지도 없음

회사 철학 + 연락처(Hotline, Email, 운영시간)만 노출
5. 어드민 UI/UX
5.1 공통 레이아웃

좌측: 사이드바 (Dashboard / 문의 / 장지 / Hotline / 메인 이미지)

상단: Top bar ("admin님 환영" + 로그아웃 버튼)

카드형 레이아웃 + Tailwind + 부드러운 섀도우

5.2 번역 워크플로우

KO/VI 필드 나란히 표시

"자동 번역" 버튼:

한국어 → 베트남어 자동 채우기

저장 전에 두 언어 모두 수정 가능

실제 공개 웹에서는 VI 필드만 사용
6. 환경 변수 (Next.js + Supabase)

.env.local / Vercel 환경 변수:

NEXT_PUBLIC_SUPABASE_URL

Supabase 프로젝트 URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

브라우저 사용 가능한 anon key

SUPABASE_SERVICE_ROLE_KEY

서버에서만 사용하는 service role key (절대 클라이언트 노출 금지)

Supabase 클라이언트 파일 구조:

src/lib/supabase/client.ts – 브라우저용

src/lib/supabase/server.ts – 서버용(RSC/Server Actions)

필요 시 src/middleware.ts로 Auth 보호
7. 개발 규칙 메모

Public / Admin 라우트 그룹 구조는 가능한 한 변경하지 않는다.

새 기능은 기존 파일 덮어쓰기보다 새 컴포넌트/새 라우트로 추가한다.

DB 스키마는 컬럼 삭제/타입 변경보다는 새 컬럼 추가로 확장한다.

번역 로직은 lib/translate/* 등 한 군데에 모아둔다.

캐러셀/지도/리스트는 항상 배열 데이터 기반 렌더링을 사용한다.
---

## 8. 반응형 웹 (Responsive Web)

- 이 프로젝트의 **모든 페이지(메인, 장지 안내, 회사 소개, 어드민 포함)**는 반응형 웹으로 구현한다.
- 목표: 하나의 코드베이스로 **모바일 / 태블릿 / 데스크탑**에서 모두 자연스럽게 동작하도록 한다.

### 8.1 기본 원칙

- **Mobile-first 접근**  
  - CSS는 모바일(좁은 화면)을 기준으로 먼저 만들고,  
    화면이 커질수록 `@media (min-width: ...)`로 레이아웃을 확장한다.
- **유동 레이아웃 & 카드 기반**  
  - 폭을 px 고정 대신 %, `max-width`, `flex`, `grid` 위주로 사용한다.
- **공통 브레이크포인트 예시**  
  - 모바일: ~ 480px  
  - 태블릿: ~ 768px  
  - 데스크탑: 1024px 이상  
  (정확한 값은 Tailwind/디자인 시스템에 맞춰 조정 가능)

### 8.2 페이지별 반응형 고려

- 메인 페이지 `/`
  - Hero, 장지 카드, 후기 캐러셀, 문의 폼이 모두 모바일에서 세로 스택 →  
    데스크탑에서는 2~3열 레이아웃으로 자연스럽게 변경.
- 장지 안내 페이지 `/jangji`
  - SVG 지도 + 리스트 레이아웃:  
    - 모바일: 지도 위, 리스트 아래(세로)  
    - 데스크탑: 좌측 지도, 우측 리스트(가로 분할)
- 회사 소개 `/company`
  - 대표 인사말과 연락 정보가 모바일에선 한 줄씩,  
    데스크탑에서는 적절히 좌/우 또는 상/하 배치.
- 어드민 `/admin/*`
  - 사이드바는 모바일에선 접을 수 있는 형태(버튼으로 열기/닫기),  
    데스크탑에선 항상 좌측 고정.
- 이 프로젝트의 모든 페이지(메인, 장지 안내, 회사 소개, 어드민)는 반응형 웹(Responsive Web)으로 구현하며,
  모바일 / 태블릿 / 데스크탑 화면에서 자연스럽게 보이도록 디자인 및 레이아웃을 구성한다.
