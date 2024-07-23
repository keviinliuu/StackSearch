import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 w-10" src="/logo.png" alt="Logo" />
            <Link href="/">
            <span className="text-orange-600 text-2xl font-bold ml-2">
              StackSearch
            </span>
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link href="/activity" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Activity
              </Link>
              <Link href="/experts" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Experts
              </Link>
              <Link href="/posts" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Posts
              </Link>
              <Link href="/responseTime" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Response Time
              </Link>
              <Link href="/qa" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                QA Difference
              </Link>
              <Link href="/related" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Related Tags
              </Link>
              <Link href="/mentioned" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Mentioned Tags
              </Link>
              <Link href="/redemption" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Redemption
              </Link>
              <Link href="/authorsAnswers" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Author's Answer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
