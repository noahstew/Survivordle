import Link from 'next/link';

interface MenuItemProps {
  label: string;
  color: string;
  returneeHref: string;
  contestantHref: string;
  side: string;
  show: boolean;
}

const sideToPosition: Record<string, string> = {
  left: 'left-0 rounded-br-lg text-left',
  right: 'right-0 rounded-bl-lg text-right',
};

const colorToDarker: Record<string, string> = {
  'text-survivor-blue': 'hover:text-survivor-blue-dark',
  'text-survivor-green': 'hover:text-survivor-green-dark',
};

function MenuItem({
  label,
  color,
  returneeHref,
  contestantHref,
  side,
  show,
}: MenuItemProps) {
  const positionClass = sideToPosition[side] || 'left-0';
  const colorClass = colorToDarker[color] || 'hover:text-survivor-blue-dark';
  const slideClass =
    side === 'left'
      ? `${show ? 'translate-x-0' : '-translate-x-full'}`
      : `${show ? 'translate-x-0' : 'translate-x-full'}`;

  return (
    <div
      className={`absolute ${color}  ${positionClass} top-16 z-10 bg-survivor-sand-light p-4 text-2xl transition-transform duration-300 ease-in-out transform ${slideClass} shadow-lg`}
    >
      <ul>
        <li>{label}</li>
        <div className={`border-b my-2 ${color}`}></div>
        <li className={`text-lg ${colorClass}`}>
          <Link href={returneeHref}>Returnees</Link>
        </li>
        <li className={`text-lg ${colorClass}`}>
          <Link href={contestantHref}>Contestants</Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuItem;
