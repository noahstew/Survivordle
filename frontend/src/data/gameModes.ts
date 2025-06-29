import { GameModeProps } from '@/components/home/GameMode';

export const gameModes: GameModeProps[] = [
  {
    title: 'Returnees',
    description:
      'Guess players using their name.  If Season turns yellow, it means the player has played on a mutual season as the player you guessed.  The Age based on last played will give higher, lower or Green for correct. Days survived includes days on Redemption and Edge of Extinction.',
    colour: '#4CAF50',
    dailyLink: '/daily/returnees',
    unlimitedLink: '/unlimited/returnees',
  },
  {
    title: 'Contestants',
    description:
      'Guess players using their name.  Season will be higher, lower or correct based on the season of the player you guessed.  The Age based on how old they were on that season will give higher, lower or Green for correct. Days survived includes days on Redemption and Edge of Extinction.',
    colour: '#2196F3',
    dailyLink: '/daily/contestant',
    unlimitedLink: '/unlimited/contestant',
  },
];
