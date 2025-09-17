import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: '프롬프트가 들어오지 않음' }, { status: 400 });
    }

    const url = `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
    });
    const imageUrl = response.headers.get('Location');
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: '에러 발생' }, { status: 500 });
  }
}
