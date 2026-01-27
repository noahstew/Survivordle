import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT name, age, seasons, days_lasted, votes_against, img_url FROM returning_contestants ORDER BY RANDOM() LIMIT 1',
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'No returnees found' },
        { status: 404 },
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 },
    );
  }
}
