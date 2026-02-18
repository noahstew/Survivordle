'use client';

import ComparisonCell from './ComparisonCell';

export interface Returnee {
  name: string;
  age: number;
  seasons: string | null; // Season numbers: "7, 20, 40"
  season_names?: string | null; // Season names: "Pearl Islands, Heroes vs Villains, Winners at War"
  days_lasted: number;
  votes_against: number;
  img_url: string;
}

export interface GuessResult {
  guess: Returnee;
  nameMatch: boolean;
  lastSeasonComparison: 'correct' | 'before' | 'after';
  ageComparison: 'correct' | 'higher' | 'lower';
  daysComparison: 'correct' | 'higher' | 'lower';
  votesComparison: 'correct' | 'higher' | 'lower';
}

interface GuessRowProps {
  result: GuessResult;
}

// Helper to extract the last season number from seasons string (e.g., "1, 8, 20" -> 20)
function getLastSeason(seasons: string | null | undefined): number {
  if (!seasons) {
    return 0;
  }

  const seasonsStr = String(seasons);
  const seasonNumbers = seasonsStr
    .split(',')
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));

  return seasonNumbers.length > 0 ? seasonNumbers[seasonNumbers.length - 1] : 0;
}

// Helper to format season display: "40: Winners at War" or just "41"
function formatSeasonDisplay(
  seasons: string | null | undefined,
  seasonNames: string | null | undefined,
): string {
  const lastSeasonNum = getLastSeason(seasons);
  if (lastSeasonNum === 0) return '0';

  // If no season names or season >= 41, just show number
  if (!seasonNames || lastSeasonNum >= 41) {
    return lastSeasonNum.toString();
  }

  // Get the last season name
  const names = seasonNames.split(',').map((s) => s.trim());
  const lastName = names[names.length - 1];

  // Remove "Survivor:" prefix if present
  const cleanName = lastName.replace(/^Survivor:\s*/i, '').trim();

  return `${lastSeasonNum}: ${cleanName}`;
}

export default function GuessRow({ result }: GuessRowProps) {
  const { guess } = result;
  const seasonDisplay = formatSeasonDisplay(guess.seasons, guess.season_names);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 rounded-lg bg-white/50 shadow-md border border-survivor-sand">
      {/* Player Image & Name Cell - Shows green only if correct */}
      <div
        className={`flex items-center gap-2 p-2 rounded-lg ${result.nameMatch ? 'bg-survivor-green' : 'bg-survivor-sand'} h-20 shadow-sm`}
      >
        <img
          src={guess.img_url}
          alt={guess.name}
          referrerPolicy="no-referrer"
          className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full border-2 border-white shadow-sm"
        />
        <div className="flex flex-col">
          <span className="text-xs text-gray-700 font-medium">Name</span>
          <span className="font-bold text-xs md:text-sm text-gray-900">
            {guess.name}
          </span>
        </div>
      </div>

      {/* Last Season Cell */}
      <ComparisonCell
        value={seasonDisplay}
        result={result.lastSeasonComparison}
        label="Last Season"
      />

      {/* Age Cell */}
      <ComparisonCell
        value={guess.age}
        result={result.ageComparison}
        label="Age"
      />

      {/* Days Lasted Cell */}
      <ComparisonCell
        value={guess.days_lasted}
        result={result.daysComparison}
        label="Days"
      />

      {/* Votes Against Cell */}
      <ComparisonCell
        value={guess.votes_against}
        result={result.votesComparison}
        label="Votes"
      />
    </div>
  );
}
