import React from 'react';
import Link from 'next/link';
import { FiMapPin } from 'react-icons/fi';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 shadow-lg">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-lg font-semibold flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity md:text-xl lg:text-2xl">
            <FiMapPin className="text-white" aria-label="map pin icon" />
            <span>Pop Trends Japan</span>
          </span>
        </Link>
        <div className="flex space-x-3 md:space-x-4">
          <Link href="/" passHref>
            <span className="text-sm cursor-pointer hover:text-gray-200 transition-colors md:text-base">
              About
            </span>
          </Link>
          <Link href="/" passHref>
            <span className="text-sm cursor-pointer hover:text-gray-200 transition-colors md:text-base">
              Contact
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
