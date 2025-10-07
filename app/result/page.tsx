'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/useFormStore';
import { Gift, MapPin, Clock, Users, TrendingUp, Home, Share2 } from 'lucide-react';
import { formatAmount } from '@/lib/utils';

export default function ResultPage() {
  const router = useRouter();
  const { formData, recommendation, reset } = useFormStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 폼 데이터 확인
    if (!formData.relationship || !formData.wedding || !formData.user) {
      router.push('/');
      return;
    }

    // AI 분석 시뮬레이션 (다음 단계에서 실제 API 연동)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [formData, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-medium">AI가 분석 중입니다...</p>
          <p className="text-gray-500 text-sm mt-2">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  // 임시 추천 데이터도 만원 단위로
  const mockRecommendation = {
    minimum: 5,
    recommended: 10,
    generous: 15,
    reasoning: {
      relationshipScore: 75,
      venueScore: 80,
      distanceScore: 60,
      reciprocityScore: 70,
    },
    explanation: '관계의 깊이와 예식장 수준, 이동 거리를 종합적으로 고려한 결과입니다.',
    regionalAverage: 9.5,
    distance: 15.3,
    travelCost: 8000,
  };

  const rec = recommendation || mockRecommendation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 p-3 rounded-full">
              <Gift className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.relationship?.name}님 축의금
              </h1>
              <p className="text-gray-600 text-sm">AI 분석 완료</p>
            </div>
          </div>
        </div>

        {/* 추천 금액 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            추천 축의금 금액
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <AmountCard
              label="최소"
              amount={rec.minimum}
              color="gray"
            />
            <AmountCard
              label="적정"
              amount={rec.recommended}
              color="rose"
              highlighted
            />
            <AmountCard
              label="넉넉한"
              amount={rec.generous}
              color="gray"
            />
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p className="text-rose-900 font-medium mb-2">💡 추천 이유</p>
            <p className="text-rose-800 text-sm leading-relaxed">
              {rec.explanation}
            </p>
          </div>
        </div>

        {/* 상세 분석 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">상세 분석</h3>
          
          <div className="space-y-3">
            <AnalysisBar
              icon={<Users className="w-4 h-4" />}
              label="관계 친밀도"
              score={rec.reasoning.relationshipScore}
            />
            <AnalysisBar
              icon={<MapPin className="w-4 h-4" />}
              label="예식장 수준"
              score={rec.reasoning.venueScore}
            />
            <AnalysisBar
              icon={<Clock className="w-4 h-4" />}
              label="이동 거리"
              score={rec.reasoning.distanceScore}
            />
            <AnalysisBar
              icon={<TrendingUp className="w-4 h-4" />}
              label="상호 관계"
              score={rec.reasoning.reciprocityScore}
            />
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">참고 정보</h3>
          
          <div className="space-y-3 text-sm">
            <InfoRow
              label="지역 평균 축의금"
              value={formatAmount(rec.regionalAverage)}
            />
            <InfoRow
              label="예식장까지 거리"
              value={`약 ${rec.distance}km`}
            />
            <InfoRow
              label="예상 교통비"
              value={`약 ${rec.travelCost.toLocaleString()}원`}
            />
            {formData.user?.previousGiftReceived && (
              <InfoRow
                label="받았던 축의금"
                value={formatAmount(formData.user.previousGiftAmount || 0)}
              />
            )}
          </div>
        </div>

        {/* 봉투 작성 팁 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">📝 봉투 작성 팁</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• 검은색 펜 사용 (볼펜 가능)</p>
            <p>• 앞면: "축 결혼" 또는 "祝 結婚"</p>
            <p>• 뒷면: 본인 이름 또는 "○○○ 드림"</p>
            <p>• 새 지폐 사용 권장</p>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              reset();
              router.push('/');
            }}
            className="flex-1 py-4 border-2 border-gray-600 rounded-xl font-semibold bg-white text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"

          >
            <Home className="w-5 h-5" />
            처음으로
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '얼마낼까 - 축의금 추천',
                  text: `${formData.relationship?.name}님 결혼식 축의금 추천: ${formatAmount(rec.recommended)}`,
                });
              }
            }}
            className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}

function AmountCard({ 
  label, 
  amount, 
  color, 
  highlighted 
}: { 
  label: string; 
  amount: number; 
  color: 'gray' | 'rose';
  highlighted?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 text-center ${
      highlighted 
        ? 'bg-rose-600 text-white ring-4 ring-rose-200' 
        : 'bg-gray-50 text-gray-700'
    }`}>
      <p className={`text-xs mb-2 ${highlighted ? 'text-rose-100' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {amount}
      </p>
      <p className={`text-xs mt-1 ${highlighted ? 'text-rose-100' : 'text-gray-500'}`}>
        만원
      </p>
    </div>
  );
}

function AnalysisBar({ 
  icon, 
  label, 
  score 
}: { 
  icon: React.ReactNode; 
  label: string; 
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-sm font-medium text-gray-900">{score}점</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-rose-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}