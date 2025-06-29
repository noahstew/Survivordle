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
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={dailyLink}>
        <button style={{ backgroundColor: colour }}>Daily Mode</button>
      </Link>
      <Link href={unlimitedLink}>
        <button style={{ backgroundColor: colour }}>Unlimited Mode</button>
      </Link>
    </div>
  );
}
export default GameMode;
