// app/animations/animation-1/page.tsx
"use client";

import { motion, useScroll } from "motion/react";

export default function Animation1Page() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-white rounded-2xl shadow-xl text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">Hello, Framer Motion!</h2>
        <p>This card fades in and moves up on load.</p>
      </motion.div>
      <motion.div
        animate={{
          scale: 2,
          transition: { duration: 2 },
        }}
      >
        <div>box</div>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => console.log("hover started!")}
      >
        aa
      </motion.button>
      <motion.div
        className={`min-h-screen space-y-[120vh] bg-gray-50 p-8`}
        style={{ scaleX: scrollYProgress }}
      >
        <div className="h-[120vh]">aa</div>
      </motion.div>
    </main>
  );
}
