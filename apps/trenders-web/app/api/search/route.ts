import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const locale = req.nextUrl.searchParams.get('locale') ?? 'az';

  const res = await fetch(
    `${process.env.API_URL}/search?q=${encodeURIComponent(q)}&locale=${locale}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}