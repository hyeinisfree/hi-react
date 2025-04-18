"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

export default function Practice3() {
  return (
    <div className="flex flex-col">
      <Header></Header>
      <div className="flex flex-col mt-12">
        <Section bg_color="bg-red-500" class_name="section1"></Section>
        <Section
          bg_color="bg-green-500"
          class_name={`section2 ${styles.section2}`}
        ></Section>
        <Section
          bg_color="bg-blue-500"
          class_name={`section3 ${styles.section3}`}
        ></Section>
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

function Section({
  bg_color,
  class_name,
}: {
  bg_color: string;
  class_name: string;
}) {
  return (
    <div
      className={`${bg_color} min-w-screen min-h-[calc(100vh-4rem)] flex justify-center items-center ${class_name}`}
    >
      <div className="text-7xl">Section</div>
    </div>
  );
}
