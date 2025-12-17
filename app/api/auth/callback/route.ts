import { NextRequest, NextResponse } from 'next/server';
import { exchangeToken } from '@/lib/strava';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/?error=access_denied', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const tokenData = await exchangeToken(code);

    // トークンをクッキーに保存（本番環境ではセキュアなストレージを使用してください）
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.cookies.set('strava_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 6, // 6時間
    });
    response.cookies.set('strava_athlete_id', tokenData.athlete.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 6,
    });

    return response;
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url));
  }
}
