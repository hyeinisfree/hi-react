// app/animations/animation-2/page.tsx
"use client";

import { useRef } from "react";

import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package

gsap.registerPlugin(useGSAP);

export default function Animation2Page() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // gsap code here...
      gsap.to(".box", { transformOrigin: "center 40%" }); // <-- automatically reverted
    },
    { scope: container }
  ); // <-- scope for selector text (optional)

  return (
    <div ref={container} className="app">
      <div className="box flex justify-center items-center bg-amber-400 w-[200px] h-[200px]">
        Hello
      </div>
    </div>
  );
}
