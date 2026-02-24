import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="bg-survivor-sand-dark text-white py-6 px-6 flex flex-col items-center justify-center gap-2">
    <p className="text-center">
      A <span className="text-yellow-200">Survivor</span> Fan-Game by{' '}
      {/* <Link
        className="text-survivor-blue hover:text-survivor-blue-dark transition-colors duration-200"
        href="https://nostew.me"
        target="_blank"
      > */}
      NoStew
      {/* </Link> */}
    </p>
    <p className="text-xs text-gray-300 text-center">
      <a
        href="https://www.flaticon.com/free-icons/torch"
        title="torch icons"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors duration-200"
      >
        Torch icons created by POD Gladiator - Flaticon
      </a>
    </p>
  </footer>
);

export default Footer;
