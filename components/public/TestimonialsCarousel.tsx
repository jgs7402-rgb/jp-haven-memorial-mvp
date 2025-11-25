'use client';

import { useEffect, useState } from 'react';

type Testimonial = {
  quote: string;
  meta: string;
};

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);

  const length = items.length;
  if (length === 0) {
    return null;
  }

  const visible: Testimonial[] = [];
  for (let i = 0; i < Math.min(3, length); i += 1) {
    const currentIndex = (index + i) % length;
    visible.push(items[currentIndex]);
  }

  useEffect(() => {
    if (length <= 3) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 3) % length);
    }, 4000);

    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {visible.map((item, idx) => (
        <div key={`${index}-${idx}`} className="section-card p-4 space-y-3">
          <p className="text-sm">“{item.quote}”</p>
          <p className="text-xs text-muted">{item.meta}</p>
        </div>
      ))}
    </div>
  );
}
