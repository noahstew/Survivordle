'use client';

import { useState } from 'react';
import MenuItem from './MenuItem';
import { IoClose } from 'react-icons/io5';

const colorToBg: Record<string, string> = {
  'text-survivor-blue': 'hover:bg-survivor-blue',
  'text-survivor-green': 'hover:bg-survivor-green',
};

interface MenuProps {
  icon: React.ReactNode;
  color: string;
}

function Menu({ icon, color }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverBg = colorToBg[color] || '';
  return (
    <div>
      <button
        className={`hover:cursor-pointer flex items-center gap-2 text-2xl ${color} ${hoverBg} hover:rounded-full hover:text-white p-2 rounded-lg`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose /> : icon}
      </button>
      <MenuItem
        label={color === 'text-survivor-blue' ? 'Daily' : 'Unlimited'}
        color={color}
        returneeHref={
          color === 'text-survivor-blue'
            ? '/daily/returnee'
            : '/unlimited/returnee'
        }
        contestantHref={
          color === 'text-survivor-blue'
            ? '/daily/contestant'
            : '/unlimited/contestant'
        }
        side={color === 'text-survivor-blue' ? 'left' : 'right'}
        show={isOpen}
      />
    </div>
  );
}

export default Menu;
