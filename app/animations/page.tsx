// app/animations/page.tsx
import Link from "next/link";

const animationList = [
  { title: "Animation 1: Fade In Card", href: "/animations/animation1" },
  {
    title: "Animation 2: Scroll-triggered Horizontal Scroll",
    href: "/animations/animation2",
  },
];

export default function AnimationsPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Animations</h1>
      <ul className="space-y-4">
        {animationList.map((anim) => (
          <li key={anim.href}>
            <Link
              href={anim.href}
              className="text-lg underline hover:text-blue-500 transition-colors"
            >
              {anim.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
