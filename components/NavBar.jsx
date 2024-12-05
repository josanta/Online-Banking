import React from "react";
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link href="/admin/users" className="text-xl font-bold mr-4">Central Pacific Financial Corp
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/admin/users" className="hover:text-gray-300">Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
