'use client';

import { useEffect, useRef, useState } from 'react';

type Testimonial = {
  quote: string;
  meta: string;
};

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const currentPositionRef = useRef(0);
  const length = items.length;

  // 클릭으로 일시정지/재개 토글
  const handleClick = () => {
    setIsPaused((prev) => !prev);
  };

  // 모든 화면 크기에서 자동 무한 스크롤
  useEffect(() => {
    if (length === 0) return;
    if (typeof window === 'undefined') return;
    if (!scrollContainerRef.current) return;

    let timeoutId: NodeJS.Timeout | null = null;

    // DOM이 완전히 렌더링될 때까지 대기
    const startAnimation = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const firstCard = container.querySelector('.carousel-item') as HTMLElement;
      if (!firstCard) {
        // 카드가 아직 렌더링되지 않았으면 재시도
        timeoutId = setTimeout(startAnimation, 50);
        return;
      }

      const cardWidth = firstCard.offsetWidth;
      const gap = 16; // gap-4 = 1rem = 16px
      const totalWidth = (cardWidth + gap) * length;

      const animate = () => {
        if (!scrollContainerRef.current) return;
        
        // 일시정지 상태가 아니면 애니메이션 진행
        if (!isPaused) {
          currentPositionRef.current -= 0.6; // 스크롤 속도 조절 (값이 클수록 빠름)
          
          // 한 사이클이 끝나면 처음으로 리셋
          if (Math.abs(currentPositionRef.current) >= totalWidth) {
            currentPositionRef.current = 0;
          }
          
          scrollContainerRef.current.style.transform = `translateX(${currentPositionRef.current}px)`;
        }
        
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // 약간의 지연 후 애니메이션 시작 (DOM 렌더링 완료 대기)
    timeoutId = setTimeout(startAnimation, 100);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationIdRef.current !== null) cancelAnimationFrame(animationIdRef.current);
    };
  }, [length, isPaused]);

  if (length === 0) {
    return null;
  }

  // 무한 스크롤을 위해 아이템 복제
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        ref={scrollContainerRef}
        onClick={handleClick}
        className="flex gap-4 cursor-pointer"
        style={{ willChange: 'transform' }}
        title={isPaused ? '클릭하여 재생' : '클릭하여 일시정지'}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="carousel-item section-card p-4 space-y-3 flex-shrink-0 min-w-[85vw] sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.67rem)]"
          >
            <p className="text-sm">&ldquo;{item.quote}&rdquo;</p>
            <p className="text-xs text-muted">{item.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
