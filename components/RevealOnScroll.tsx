'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export default function RevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번만 실행되도록 끊어줌
        }
      },
      { threshold: 0.4 } // 40% 이상 보여야 트리거
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        'w-[300px] mx-auto p-6 bg-indigo-500 text-white rounded-xl text-center text-lg transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      ✨ I fade in when I enter the viewport! ✨
    </div>
  );
}
