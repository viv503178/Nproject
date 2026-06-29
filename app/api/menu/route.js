import { NextResponse } from 'next/server';
import { getMenuItems } from '@/lib/db';

// This route is what a client-rendered header would call. The home page in
// this project fetches the menu directly on the server (see app/page.js)
// for the fastest, most SEO-friendly render, but this endpoint is kept so
// the same data can power a mobile app, a client-side re-fetch, or future
// pages that render the header purely on the client.
export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json(
      { items },
      {
        headers: {
          // Menu changes rarely; let edge/browser caches reuse it briefly.
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Unable to load menu.' }, { status: 500 });
  }
}
