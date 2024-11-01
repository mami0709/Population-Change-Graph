import React from 'react';
import Link from 'next/link';
import { FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-8 shadow-inner mt-20">
      <div className="container mx-auto text-center space-y-4">
        <p className="text-sm md:text-base">
          &copy; 2024 Pop Trends Japan. All rights reserved.
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            href="https://twitter.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FiTwitter className="text-gray-400 hover:text-white transition-colors text-xl md:text-2xl" />
          </Link>
          <Link
            href="https://facebook.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FiFacebook className="text-gray-400 hover:text-white transition-colors text-xl md:text-2xl" />
          </Link>
          <Link
            href="https://instagram.com"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FiInstagram className="text-gray-400 hover:text-white transition-colors text-xl md:text-2xl" />
          </Link>
        </div>

        <p className="text-xs text-gray-400 md:text-sm">
          Crafted with care by Pop Trends Japan
        </p>
      </div>
    </footer>
  );
}
