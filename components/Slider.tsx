"use client";

import { useRef, useState } from "react";

const slides = ["🍕", "🍔", "🍟", "🌮", "🍣", "🍜"];

export default function Slider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const slideWidth = 300; // 카드 한 개 너비 (px)

  const scrollToSlide = (targetIndex: number) => {
    const track = trackRef.current;
    if (!track) return;

    const from = current * slideWidth;
    const to = targetIndex * slideWidth;
    const distance = to - from;

    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const duration = 400;
      const progress = Math.min(elapsed / duration, 1);
      const x = from + distance * progress;
      track.style.transform = `translateX(${-x}px)`;
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    setCurrent(targetIndex);
  };

  const prev = () => {
    if (current > 0) scrollToSlide(current - 1);
  };

  const next = () => {
    if (current < slides.length - 1) scrollToSlide(current + 1);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="relative w-[300px] overflow-hidden border rounded-lg shadow bg-white">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300"
          style={{
            width: `${slides.length * slideWidth}px`,
          }}
        >
          {slides.map((emoji, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] h-[200px] flex items-center justify-center text-6xl"
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={prev}
          className="px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-40"
          disabled={current === 0}
        >
          Prev
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-40"
          disabled={current === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
