import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 w-10" src="/logo.png" alt="Logo" />
            <span className="text-orange-600 text-2xl font-bold ml-2">
              StackSearch
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <a href="#activity" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Activity
              </a>
              <a href="#experts" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Experts
              </a>
              <a href="#posts" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Posts
              </a>
              <a href="#response-time" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Response Time
              </a>
              <a href="#qa-diff" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                QA Difference
              </a>
              <a href="#related-tags" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Related Tags
              </a>
              <a href="#mentioned-tags" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Mentioned Tags
              </a>
              <a href="#redemption" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Redemption
              </a>
              <a href="#authors-answers" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Author's Answer
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
