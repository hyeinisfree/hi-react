"use client";
import { useRef, useLayoutEffect, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Practice2() {
  const container = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     const section3Height = section3.current?.offsetHeight;
  //     ScrollTrigger.create({
  //       trigger: ".section2",
  //       start: "bottom bottom",
  //       end: "top top",
  //       endTrigger: ".section3",
  //       pin: true,
  //       pinSpacing: false,
  //       markers: true,
  //       scrub: 2,
  //     });
  //   });
  //   return () => ctx.revert(); // <- cleanup!
  // }, []);

  // useGSAP(
  //   () => {
  //     ScrollTrigger.create({
  //       trigger: ".section2",
  //       start: "top top",
  //       end: "bottom top",
  //       endTrigger: ".section3",
  //       pin: true,
  //       pinSpacing: false,
  //       markers: true,
  //     });
  //   },
  //   { scope: container }
  // );

  return (
    <div className="flex flex-col">
      <Header></Header>
      <div ref={container} className="flex flex-col mt-12">
        <Section bg_color="bg-red-500" class_name="section1"></Section>
        <Section bg_color="bg-green-500" class_name="section2"></Section>
        <Section bg_color="bg-blue-500" class_name="section3 z-20"></Section>
        <Section bg_color="bg-yellow-500" class_name="section4"></Section>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed bg-blue-200 px-7 py-4 min-w-screen">
      <div className="flex justify-between items-center">
        <div>Practice2</div>
        <nav>
          <ul className="flex gap-2">
            <li>About</li>
            <li>Work</li>
            <li>Practice</li>
            <li>Blog</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

const Section = forwardRef<
  HTMLDivElement,
  { bg_color: string; class_name: string }
>(({ bg_color, class_name }, ref) => {
  return (
    <div
      ref={ref}
      className={`${bg_color} min-w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center ${class_name}`}
    >
      <div className="text-7xl">Section</div>
    </div>
  );
});
