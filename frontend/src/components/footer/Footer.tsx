import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="bg-survivor-sand-dark text-white py-4 px-6 flex items-center justify-center">
    <p>
      {' '}
      A <span className="text-yellow-200">Survivor </span> Fan-Game by{' '}
      <Link
        className="text-survivor-blue hover:text-survivor-blue-dark transiion-colors duration-200"
        href="https://nostew.com"
        target="_blank"
      >
        NoStew
      </Link>
    </p>
  </footer>
);

export default Footer;
