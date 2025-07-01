'use client';

import Link from 'next/link';
import Menu from './Menu';
import { GiTorch } from 'react-icons/gi';
import { MdCalendarToday } from 'react-icons/md';
import { IoInfinite } from 'react-icons/io5';

function NavBar() {
  return (
    <nav className="relative justify-between gap-4 flex items-center p-4 bg-survivor-sand-light ">
      <Menu icon={<MdCalendarToday />} color="text-survivor-blue" />

      <Link
        href="/"
        className="text-3xl font-bold text-black hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <span className="flex items-center gap-2">
          Survivordle
          <GiTorch />
        </span>
      </Link>

      <Menu icon={<IoInfinite />} color="text-survivor-green" />
    </nav>
  );
}

export default NavBar;
