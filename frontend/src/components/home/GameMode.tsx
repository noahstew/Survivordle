'use client';
import Link from 'next/link';

export interface GameModeProps {
  title: string;
  description: string;
  colour: string;
  dailyLink: string;
  unlimitedLink: string;
}

function GameMode(gameMode: GameModeProps) {
  const { title, description, colour, dailyLink, unlimitedLink } = gameMode;
  // Tailwind dynamic color classes require inline style for border and bg
  return (
    <div className="relative flex flex-col items-start mb-8">
      {/* Border container */}
      <div
        className="w-full rounded-lg border-2 px-0 pt-6 pb-6 bg-white"
        style={{ borderColor: colour }}
      >
        {/* Offset heading */}
        <div
          className="absolute -top-5 left-4 px-6 py-2 rounded-lg shadow-md text-white text-2xl font-bold"
          style={{ backgroundColor: colour }}
        >
          {title}
        </div>
        {/* Description as image-like area */}
        <div className="w-full flex flex-col items-start px-6 mt-4">
          <div
            className="w-full min-h-[120px] flex items-center justify-center rounded-md  text-gray-800 text-lg font-medium mb-6"
            style={{
              background: 'linear-gradient(135deg, #f3f4f6 60%, #e5e7eb 100%)',
            }}
          >
            {description}
          </div>
          {/* Buttons */}
          <div className="flex gap-4 justify-between w-full">
            <Link href={dailyLink}>
              <button
                className="px-5 py-2 rounded-md text-white font-semibold shadow-md transition-colors duration-200"
                style={{ backgroundColor: colour }}
              >
                Daily Mode
              </button>
            </Link>
            <Link href={unlimitedLink}>
              <button
                className="px-5 py-2  font-semibold transition-colors duration-200"
                style={{ borderBottom: `2px solid ${colour}`, color: colour }}
                // Remove event handlers, use Tailwind for hover effect
              >
                <span
                  className="hover:text-white"
                  style={{ transition: 'color 0.2s', color: 'inherit' }}
                >
                  Unlimited Mode
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameMode;
