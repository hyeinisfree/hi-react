'use client';

import { useRef, useState } from 'react';
import styles from './page.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';

gsap.registerPlugin(useGSAP);

export default function PracticePage() {
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      gsap.to('.box', {
        duration: 1,
        rotation: 360,
        opacity: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: 'sine.out',
        force3D: true,
      });
    },
    { scope: container }
  );

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('down');

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - scrollY.getPrevious();
    setScrollDirection(diff > 0 ? 'down' : 'up');
  });

  const handleClick = contextSafe(() => {
    gsap.to('.box', {
      duration: 0.5,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: 'back.in',
    });
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      <motion.div
        className={`${styles.progress_bar} progress_bar`}
        style={{ scaleX: scrollYProgress, originX: 0 }}
      ></motion.div>
      <main ref={container} className="container flex flex-col justify-center">
        <section
          className={`${styles.section} flex flex-col justify-center items-center gap-6`}
        >
          <h1 className="text-3xl">Click a box to transition</h1>
          <div className="box-container flex justify-center items-center gap-2">
            <div
              className={`${styles.box} box bg-green-400`}
              onClick={handleClick}
            ></div>
            <div className={`${styles.box} box bg-blue-400`}></div>
            <div className={`${styles.box} box bg-yellow-400`}></div>
          </div>
        </section>
        <section
          className={`${styles.section} flex flex-col justify-center items-center gap-6`}
        >
          <div className="box-container flex justify-center items-center gap-2">
            <motion.div
              drag
              className={`${styles.box} box bg-fuchsia-400`}
              whileHover={{ scale: 1.1 }}
            ></motion.div>
            <div className={`${styles.box} box bg-fuchsia-400`}></div>
            <div className={`${styles.box} box bg-fuchsia-400`}></div>
          </div>
        </section>
        <section
          className={`${styles.section} flex justify-center items-center`}
        >
          <motion.div
            className="grid-container grid grid-cols-2 gap-6"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.2 }}
          >
            <div className="introduction min-w-56">
              <h2 className="text-2xl">Hi! I'm</h2>
              <h1 className="text-4xl">Hyein Kim</h1>
            </div>
            <div className="role min-w-64">
              <h3 className="text-xl">A Creative</h3>
              <h2 className="text-2xl">Backend Developer</h2>
            </div>
            <div className="aboutme col-span-2">
              <h2 className="text-2xl">About Me</h2>
              <p>
                모든 국민은 사생활의 비밀과 자유를 침해받지 아니한다. 누구든지
                체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를
                가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는
                법률이 정하는 바에 의하여 국가가 변호인을 붙인다. 재의의 요구가
                있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과
                출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그
                법률안은 법률로서 확정된다. 국무위원은 국정에 관하여 대통령을
                보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 대법원장의
                임기는 6년으로 하며, 중임할 수 없다. 군사법원의 조직·권한 및
                재판관의 자격은 법률로 정한다. 모든 국민은 신체의 자유를 가진다.
                누구든지 법률에 의하지 아니하고는 체포·구속·압수·수색 또는
                심문을 받지 아니하며, 법률과 적법한 절차에 의하지 아니하고는
                처벌·보안처분 또는 강제노역을 받지 아니한다.
              </p>
            </div>
          </motion.div>
        </section>
        <section
          className={`${styles.section} flex justify-center items-center`}
        ></section>
      </main>
    </div>
  );
}
