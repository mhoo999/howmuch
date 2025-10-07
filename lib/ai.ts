import OpenAI from 'openai';
import { FormData, AIRecommendation } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeWeddingGift(formData: FormData): Promise<AIRecommendation> {
  const { relationship, wedding, user } = formData;

  const relationshipScore = calculateRelationshipScore(relationship);
  
  const prompt = `당신은 한국의 경조사 문화 전문가입니다. 다음 정보를 바탕으로 적절한 축의금 금액을 추천해주세요.

## 관계 정보
- 이름: ${relationship.name}
- 알게 된 장소: ${relationship.meetingPlace} ${relationship.meetingPlaceDetail || ''}
- 알고 지낸 기간: ${relationship.yearsKnown}년 ${relationship.monthsKnown}개월
- 최근 1년 1:1 만남: ${relationship.oneOnOneMeetings}회
- 연락 빈도: ${relationship.contactFrequency}
- 공통 지인: ${relationship.mutualFriends}명

## 예식 정보
- 예식장: ${wedding.venueName}
- 주소: ${wedding.venueAddress}
- 날짜: ${wedding.weddingDate}
- 식사 포함: ${wedding.mealIncluded ? '예' : '아니오'}
- 동반 인원: ${wedding.accompanyingGuests}명

## 사용자 정보
- 나이: ${user.age}세
- 직업: ${user.occupation}
- 출발지: ${user.userAddress}
- 과거 받은 축의금: ${user.previousGiftReceived ? `${user.previousGiftAmount}만원` : '없음'}

다음 형식으로 JSON만 응답해주세요:
{
  "minimum": 숫자 (최소 금액, 만원 단위),
  "recommended": 숫자 (추천 금액, 만원 단위),
  "generous": 숫자 (넉넉한 금액, 만원 단위),
  "venueScore": 0-100 (예식장 수준 점수),
  "distanceScore": 0-100 (거리 점수),
  "reciprocityScore": 0-100 (상호관계 점수),
  "explanation": "추천 이유 설명 (2-3문장)",
  "regionalAverage": 숫자 (해당 지역 평균, 만원 단위),
  "distance": 숫자 (km),
  "travelCost": 숫자 (예상 교통비, 원 단위)
}

주의사항:
- **모든 축의금 금액은 만원 단위로 표기** (예: 10만원 → 10)
- 한국 축의금 평균: 5~15 (만원 단위)
- 관계가 가까울수록, 예식장이 고급일수록 높게
- 받은 축의금이 있으면 비슷하거나 약간 높게
- 동반 인원이 있으면 1인당 3-5 추가 고려
- 교통비만 원 단위로 계산`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 한국 경조사 문화 전문가입니다. 항상 JSON 형식으로만 응답하며, 축의금은 만원 단위로 계산합니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      minimum: result.minimum,
      recommended: result.recommended,
      generous: result.generous,
      reasoning: {
        relationshipScore,
        venueScore: result.venueScore,
        distanceScore: result.distanceScore,
        reciprocityScore: result.reciprocityScore,
      },
      explanation: result.explanation,
      regionalAverage: result.regionalAverage,
      distance: result.distance,
      travelCost: result.travelCost,
    };
  } catch (error) {
    console.error('AI 분석 에러:', error);
    throw new Error('AI 분석에 실패했습니다.');
  }
}

function calculateRelationshipScore(relationship: any): number {
  let score = 0;

  // 알고 지낸 기간 (최대 30점)
  const totalMonths = relationship.yearsKnown * 12 + relationship.monthsKnown;
  score += Math.min(totalMonths / 2, 30);

  // 만남 횟수 (최대 25점)
  score += Math.min(relationship.oneOnOneMeetings * 2.5, 25);

  // 연락 빈도 (최대 25점)
  const frequencyScore = {
    daily: 25,
    weekly: 20,
    monthly: 15,
    occasionally: 10,
  };
  score += frequencyScore[relationship.contactFrequency as keyof typeof frequencyScore] || 10;

  // 공통 지인 (최대 20점)
  score += Math.min(relationship.mutualFriends * 2, 20);

  return Math.round(Math.min(score, 100));
}