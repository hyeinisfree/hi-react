"use client";
import { useRef, useState, useEffect } from "react";

const Responsive = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    // 섹션의 왼쪽 여백을 계산
    const calculateOffset = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        setLeftOffset(sectionRect.left);
      }
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);

    return () => {
      window.removeEventListener("resize", calculateOffset);
    };
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section
        ref={sectionRef}
        className="h-[calc(100vh-4rem)] bg-amber-200 flex items-center"
      >
        <div>
          <h1>Full Section</h1>
          <div className="cards absolute left-0 w-[calc(100vw-15px)] bg-red-400 overflow-x-auto">
            <div
              className="card-contanier flex"
              style={{ transform: `translateX(${leftOffset}px)` }}
            >
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
              <div className="card min-w-60 h-52 border-1 bg-purple-400"></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h1>Responsive Test 1</h1>
          <div className="card-container">
            <div className="card">
              <h2>card1</h2>
              <p>어쩌구</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Responsive;
