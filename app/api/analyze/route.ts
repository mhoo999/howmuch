import { NextRequest, NextResponse } from 'next/server';
import { analyzeWeddingGift } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // 유효성 검사
    if (!formData.relationship || !formData.wedding || !formData.user) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const recommendation = await analyzeWeddingGift(formData);

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error('분석 에러:', error);
    return NextResponse.json(
      { error: 'AI 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}