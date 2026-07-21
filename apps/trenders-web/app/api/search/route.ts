import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const locale = req.nextUrl.searchParams.get('locale') ?? 'az';
  const limit = req.nextUrl.searchParams.get('limit');

  const params = new URLSearchParams({ q, locale });
  if (limit) params.set('limit', limit);

  const res = await fetch(`${process.env.API_URL}/search?${params.toString()}`);
  const data = await res.json();
  return NextResponse.json(data);
}