'use client';

import { trackEvent } from '@/src/lib/ga';

type Props = {
  phone?: string | null;
  phoneLabel?: string;
  /**
   * Zalo 문의용 전화번호 (digits). 제공되면 `https://zalo.me/<digits>`로 링크 생성
   * (홈페이지는 settings.zaloUrl을 사용하므로, 상세 페이지에서는 zaloUrl에서 digits를 추출해 전달해도 됨)
   */
  zaloPhone?: string | null;
  zaloLabel?: string;
  /**
   * 이미 완성된 Zalo URL이 있다면 전달 가능 (예: `https://zalo.me/3258...`)
   * - 값이 비어있거나 `#`이면 무시됨
   */
  zaloUrl?: string | null;
  className?: string;
};

function normalizeTelHref(phoneRaw: string): string | null {
  const trimmed = phoneRaw.trim();
  if (!trimmed) return null;

  // tel:은 + 와 숫자만 남기고(나머지 제거) +는 맨 앞에만 허용
  let cleaned = trimmed.replace(/[^\d+]/g, '');
  if (cleaned.includes('+')) {
    cleaned = cleaned.replace(/\+/g, '');
    cleaned = `+${cleaned}`;
  }

  const digitsOnly = cleaned.replace(/\D/g, '');
  // 너무 짧으면(placeholder 등) 링크 노출하지 않음
  if (digitsOnly.length < 8) return null;

  return `tel:${cleaned}`;
}

function normalizeZaloDigits(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  if (digits.length < 8) return null;
  return digits;
}

function buildZaloHref({
  zaloUrl,
  zaloPhone,
}: {
  zaloUrl?: string | null;
  zaloPhone?: string | null;
}): string | null {
  const url = (zaloUrl ?? '').trim();
  if (url && url !== '#') {
    // URL 안에서 digits 추출 → https://zalo.me/<digits> 형태로 강제
    const digitsFromUrl = normalizeZaloDigits(url);
    if (digitsFromUrl) return `https://zalo.me/${digitsFromUrl}`;
  }

  const phone = (zaloPhone ?? '').trim();
  if (phone) {
    const digits = normalizeZaloDigits(phone);
    if (digits) return `https://zalo.me/${digits}`;
  }

  return null;
}

export default function CemeteryContactButtons({
  phone,
  phoneLabel,
  zaloPhone,
  zaloLabel,
  zaloUrl,
  className,
}: Props) {
  const telHref = phone ? normalizeTelHref(phone) : null;
  const zaloHref = buildZaloHref({ zaloUrl, zaloPhone });

  // 둘 다 없으면 섹션 자체를 숨김
  if (!telHref && !zaloHref) return null;

  return (
    <section className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {telHref ? (
          <a
            href={telHref}
            onClick={() => {
              trackEvent('전화걸기_클릭', { 위치: 'jangji_detail_contact' });
            }}
            className="w-full px-6 py-3 sm:py-4 text-sm sm:text-base bg-sky-600 text-white rounded-lg shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 text-center"
          >
            {phoneLabel ?? 'Gọi tư vấn ngay'}
          </a>
        ) : null}

        {zaloHref ? (
          <a
            href={zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('Zalo상담_클릭', { 위치: 'jangji_detail_contact' });
            }}
            className="w-full px-6 py-3 sm:py-4 text-sm sm:text-base bg-white text-sky-600 border border-sky-600 rounded-lg shadow-soft transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 text-center"
          >
            {zaloLabel ?? 'Chat qua Zalo'}
          </a>
        ) : null}
      </div>
    </section>
  );
}


