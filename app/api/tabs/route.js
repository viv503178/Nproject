import { NextResponse } from 'next/server';
import { getTabContent } from '@/lib/db';
import { isValidSlug } from '@/lib/validate';

// GET /api/tabs?tab=calculators
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get('tab');

  // Allow-list validation: reject anything that isn't a plain slug before
  // it ever reaches the data layer. This is what stops query-string
  // injection / path traversal style abuse of this endpoint.
  if (!isValidSlug(tab)) {
    return NextResponse.json({ error: 'Invalid tab key.' }, { status: 400 });
  }

  try {
    const content = await getTabContent(tab);
    if (!content) {
      return NextResponse.json({ error: 'Tab not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { content },
      { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=120' } }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Unable to load tab content.' }, { status: 500 });
  }
}
