interface Contestant {
  name: string;
  season: string;
  age: number;
  days_lasted: string;
  placement: number;
  votes_against: number;
  imgUrl: string;
}

interface Returnee {
  name: string;
  seasons: string;
  age: number;
  days_lasted: number;
  votes_against: number;
  img_url: string;
}

// Game-related types
type ComparisonResult = 'correct' | 'higher' | 'lower' | 'before' | 'after';

interface GuessResult {
  guess: Returnee;
  nameMatch: boolean;
  lastSeasonComparison: 'correct' | 'before' | 'after';
  ageComparison: ComparisonResult;
  daysComparison: ComparisonResult;
  votesComparison: ComparisonResult;
}
