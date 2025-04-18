"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 h-16">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              사이트명
            </Link>
          </div>

          {/* 데스크톱 메뉴 - lg 이상에서만 표시 */}
          <nav className="hidden lg:flex space-x-6">
            <Link href="/" className="hover:text-gray-300">
              홈
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              소개
            </Link>
            <Link href="/services" className="hover:text-gray-300">
              서비스
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              연락처
            </Link>
          </nav>

          {/* 모바일 햄버거 메뉴 버튼 - lg 미만에서만 표시 */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 - lg 미만에서 햄버거 메뉴 클릭 시 표시 */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 space-y-3 pb-3">
            <Link href="/" className="block hover:text-gray-300">
              홈
            </Link>
            <Link href="/about" className="block hover:text-gray-300">
              소개
            </Link>
            <Link href="/services" className="block hover:text-gray-300">
              서비스
            </Link>
            <Link href="/contact" className="block hover:text-gray-300">
              연락처
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
