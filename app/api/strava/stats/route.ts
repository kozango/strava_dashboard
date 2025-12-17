import { NextRequest, NextResponse } from 'next/server';
import { StravaClient } from '@/lib/strava';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('strava_access_token')?.value;
  const athleteId = request.cookies.get('strava_athlete_id')?.value;

  if (!accessToken || !athleteId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = new StravaClient(accessToken);
    const stats = await client.getStats(parseInt(athleteId));
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
