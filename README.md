# JP Haven Memorial MVP

This repository will contain the Next.js 14 + Supabase MVP for JP Haven Memorial.

## Routes / Pages
- `/` (메인 랜딩): Hero, featured cemeteries, testimonials, inquiry 섹션.
- `/jangji`: 장지 목록/탐색.
- `/company`: **회사 소개 페이지(베트남어)** – 회사 소개, 미션, 비전, 주요 서비스, 문의 섹션. 상단 "JP Haven Memorial" 클릭 시 홈(`/`) 이동.
- `/admin/*`: 어드민 콘솔(한국어 UI).

## 회사 소개 페이지 (/company)
- 베트남어 기반으로 회사 소개, 미션, 비전, 주요 서비스를 노출.
- 하단 “Chuyển tới trang liên hệ” 버튼을 누르면 공통 문의 모달(ContactModal)이 팝업처럼 열리고, 이름/전화번호/이메일/문의 내용을 `/api/contact` 엔드포인트로 POST 전송.
- 상단 타이틀/로고 “JP Haven Memorial” 클릭 시 메인 홈(`/`)으로 이동.

### site_settings 연동
- Supabase `site_settings` 테이블의 `hotline_number`, `support_email` 값을 불러와 Hotline/Email을 표시.
- 동일한 설정 값이 다른 페이지에서도 공용으로 사용됨.

### ContactModal 컴포넌트
- 경로: `components/contact/ContactModal.tsx`
- 재사용 가능한 문의 모달 컴포넌트이며, props:
  - `isOpen`, `onClose`, `defaultEmail`, `action`(기본 `/api/contact`), `source`(hidden 필드).
- /company 외 다른 페이지에서도 동일하게 재사용 가능.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (DB)
- Vercel (예정)

## Future Plan – Region-specific hotlines (not implemented yet)

나중에는 북부 / 중부 / 남부 등 지역별로 다른 Hotline 번호와 안내문구를 설정할 수 있는 기능을 추가할 예정입니다. 현재는 전역 공통 Hotline 설정만 지원하며, 관련 기획 및 스키마 설계는 추후에 단계적으로 진행합니다.

In the future, we may support region-specific hotline settings (e.g., different hotline numbers / notices for North, Central, South regions). For now, only a single global hotline configuration is implemented.
