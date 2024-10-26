import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white text-gray-900 p-4 shadow-md">
      <nav className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-base font-semibold md:text-lg cursor-pointer">
            日本人口データマップ
          </span>
        </Link>
      </nav>
    </header>
  );
}
