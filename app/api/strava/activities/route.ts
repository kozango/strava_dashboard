import { NextRequest, NextResponse } from 'next/server';
import { StravaClient } from '@/lib/strava';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('strava_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = new StravaClient(accessToken);
    const activities = await client.getActivities();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
