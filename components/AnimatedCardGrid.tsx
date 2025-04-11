"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const cards = Array.from({ length: 6 }, (_, i) => ({
  title: `Card ${i + 1}`,
  content: `This is the content of card ${i + 1}`,
}));

export default function AnimatedCardGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          data-index={i}
          className={clsx(
            "p-6 bg-white rounded-lg shadow transition-all duration-700 ease-out transform",
            visibleCards[i]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.content}</p>
        </div>
      ))}
    </div>
  );
}
