"use client";
import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "motion/react";

export default function AnimatedSection() {
  // const boxRef = useRef(null);
  const sectionRef = useRef(null);

  // useEffect(() => {
  //   // 서버 사이드 렌더링 시 에러 방지
  //   if (typeof window === "undefined") return;

  //   gsap.registerPlugin(ScrollTrigger);

  //   // 박스 애니메이션
  //   gsap.fromTo(
  //     boxRef.current,
  //     { opacity: 0, y: 100 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: sectionRef.current, // 트리거 요소
  //         start: "top center", // 뷰포트의 중앙에 요소의 상단이 오면 시작
  //         end: "bottom center", // 뷰포트의 중앙에 요소의 하단이 오면 종료
  //         toggleActions: "play pause reverse reset", // 스크롤 방향에 따른 행동 정의
  //         markers: true, // 개발 시 마커 표시 (프로덕션에서는 제거)
  //       },
  //     }
  //   );

  //   return () => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!boxRef.current) return;

    gsap.fromTo(
      boxRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          markers: true,
        },
      }
    );
  }, []);

  const mainRef = useRef(null);
  const section2Ref = useRef(null);
  const headerHeight = "64px";

  useLayoutEffect(() => {
    // 서버 사이드 렌더링 시 실행되지 않도록
    if (typeof window === "undefined") return;

    // GSAP와 ScrollTrigger 동적 임포트
    const initScrollTrigger = async () => {
      gsap.registerPlugin(ScrollTrigger);

      // section2 내부 스크롤 컨테이너 참조
      const innerScrollContainer = section2Ref.current.querySelector(
        ".inner-scroll-container"
      );

      if (!innerScrollContainer) return;
      const totalScrollHeight =
        innerScrollContainer.scrollHeight - innerScrollContainer.clientHeight;

      // Section2에 대한 ScrollTrigger 설정
      let section2 = ScrollTrigger.create({
        trigger: section2Ref.current,
        start: () => `top ${headerHeight}px`,
        end: () => `+=${totalScrollHeight}`,
        pin: true, // 섹션 고정
        anticipatePin: 1, // 핀 동작을 부드럽게
        pinSpacing: true,
        scrub: true, // 스크롤에 애니메이션 동기화
        markers: true,

        // 스크롤 진행 상태에 따라 내부 스크롤 조정
        onUpdate: (self) => {
          // 메인 스크롤에 따라 내부 스크롤 위치 계산
          const scrollAmount = self.progress * totalScrollHeight;
          innerScrollContainer.scrollTop = scrollAmount;

          if (
            self.progress >= 0.99 &&
            innerScrollContainer.scrollTop >= totalScrollHeight - 1
          ) {
            // 스크롤이 끝에 도달하면 핀을 해제할 수 있음
            // self.disable(); // 필요하다면 이 부분 활성화
          }
        },
      });

      // ScrollTrigger 리프레시 (레이아웃 변경에 대응)
      ScrollTrigger.refresh();
    };

    // 초기화 실행
    initScrollTrigger();

    // 클린업 함수
    return () => {
      // 모듈이 로드된 경우에만 정리
      if (gsap.ScrollTrigger) {
        const allTriggers = gsap.ScrollTrigger.getAll();
        allTriggers.forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="flex flex-col">
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-green-100"></section>
      <section
        ref={sectionRef}
        className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-yellow-100"
      >
        <div
          ref={boxRef}
          className="w-64 h-64 bg-blue-500 flex items-center justify-center text-white"
        >
          스크롤하면 나타나는 박스
        </div>
      </section>
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-red-100"></section>
      <section
        ref={section2Ref}
        className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-purple-100"
      >
        <div className="section-content p-8">
          <h2 className="text-3xl font-bold mb-4">Section 2</h2>
          <p className="mb-4">
            이 섹션은 스크롤 시 고정되며 내부 스크롤이 동작합니다.
          </p>

          {/* 내부 스크롤 컨테이너 */}
          <div
            className="inner-scroll-container h-[40vh] relative"
            style={{ overflow: "hidden" }} // 스크롤바는 숨기지만 스크롤은 가능하게
          >
            <div className="inner-content">
              {[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-4 bg-blue-${(item % 10) * 100 || 100} ${
                    item > 8 ? "text-white" : ""
                  } mb-4`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  내부 스크롤 아이템 {item}
                </motion.div>
              ))}
              <motion.div
                className="p-4 bg-green-500 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                내부 스크롤 끝!
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-lime-100"></section>
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-blue-100"></section>
    </div>
  );
}
