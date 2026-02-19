import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    // Get a random returnee
    const returneeResult = await pool.query(
      'SELECT name, age, seasons, days_lasted, votes_against, img_url FROM returning_contestants ORDER BY RANDOM() LIMIT 1',
    );

    if (returneeResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'No returnees found' },
        { status: 404 },
      );
    }

    const returnee = returneeResult.rows[0];

    // Get seasons map
    const seasonsResult = await pool.query(
      'SELECT season_number, season_name FROM seasons ORDER BY season_number',
    );

    // Create a map of season names to numbers
    const seasonMap: { [key: string]: number } = {};
    seasonsResult.rows.forEach((season: any) => {
      // Normalize season name: lowercase, remove extra spaces, remove "Survivor:" or "Survivor ##:" prefix
      const normalize = (name: string) =>
        name
          .replace(/^Survivor\s*\d*:\s*/i, '')
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ' ');

      const normalizedName = normalize(season.season_name);
      seasonMap[normalizedName] = season.season_number;
      // Also store original for exact matches
      seasonMap[season.season_name.toLowerCase()] = season.season_number;
    });

    // Convert season names to numbers and keep names
    if (returnee.seasons) {
      const seasonNames = returnee.seasons
        .split(',')
        .map((s: string) => s.trim());
      const seasonNumbers = seasonNames
        .map((name: string) => {
          // First, try to parse as a number directly
          const directNumber = parseInt(name);
          if (!isNaN(directNumber)) {
            return directNumber;
          }

          // Check if the name has "Survivor ##:" format and extract the number
          const seasonNumberMatch = name.match(/^Survivor\s*(\d+):/i);
          if (seasonNumberMatch) {
            return parseInt(seasonNumberMatch[1]);
          }

          // Try normalized lookup as fallback
          const normalized = name
            .replace(/^Survivor\s*\d*:\s*/i, '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, ' ');
          return seasonMap[normalized] || seasonMap[name.toLowerCase()];
        })
        .filter((num: number) => num !== undefined && !isNaN(num));

      returnee.season_names = returnee.seasons;
      returnee.seasons =
        seasonNumbers.length > 0 ? seasonNumbers.join(', ') : null;
    }

    // Convert string fields to numbers
    returnee.days_lasted = parseInt(returnee.days_lasted) || 0;
    returnee.votes_against = parseInt(returnee.votes_against) || 0;

    return NextResponse.json(returnee);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 },
    );
  }
}
