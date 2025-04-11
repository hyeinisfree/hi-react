"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import RevealOnScroll from "@/components/RevealOnScroll";
import Slider from "@/components/Slider";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
const Animation = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const box = boxRef.current;

    function animateBox() {
      if (!box) return;
      xRef.current += 2;
      box.style.transform = `translateX(${xRef.current}px)`;
      if (xRef.current < 500) requestAnimationFrame(animateBox);
    }

    animateBox();
  }, []);

  useEffect(() => {
    const box2 = box2Ref.current;

    function animate(timestamp: number) {
      if (!box2) return;
      if (!startRef.current) startRef.current = timestamp;

      const duration = 1000;
      const distance = 500;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const x = distance * progress;
      box2.style.transform = `translateX(${x}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={styles.container}>
        <section className={styles.section}>
          <button className={styles.animatedButton}>Hover me</button>
        </section>

        <section className={styles.section}>
          <div className={styles.card}>Hello, I&apos;m a card ✨</div>
        </section>

        <section className={styles.section}>
          <div ref={boxRef} className={styles.box}></div>
        </section>

        <section className={styles.section}>
          <div ref={box2Ref} className={styles.box2}></div>
        </section>

        <section className={styles.section}>
          <div ref={box2Ref} className={styles.box3}></div>
        </section>

        <section
          className={`${styles.section} min-h-screen space-y-[120vh] bg-gray-50 p-8`}
        >
          <h1 className="text-center text-2xl font-bold">Scroll down ⬇️</h1>
          <RevealOnScroll />
          <h2 className="text-center text-lg text-gray-600">
            Bottom content 🪄
          </h2>
        </section>
        <section className={styles.section}>
          <Slider />
        </section>

        <section className={styles.section}>
          <AnimatedCardGrid />
        </section>
      </div>
    </main>
  );
};

export default Animation;
