// src/components/forms/Step3UserForm.tsx
'use client';

import { useState } from 'react';
import { useFormStore } from '@/store/useFormStore';
import { ArrowRight, ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/types';

export default function Step3UserForm() {
  const router = useRouter();
  const { formData, updateUser, prevStep } = useFormStore();
  const user = (formData.user || {}) as Partial<UserInfo>;

  const [formState, setFormState] = useState({
    age: user.age || 30,
    occupation: user.occupation || '',
    userAddress: user.userAddress || '',
    previousGiftReceived: user.previousGiftReceived ?? false,
    previousGiftAmount: user.previousGiftAmount || 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formState);
    
    setIsLoading(true);
    
    // API 호출 시뮬레이션 (다음 단계에서 실제 구현)
    setTimeout(() => {
      router.push('/result');
    }, 2000);
  };

  const updateField = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        추가 정보를 알려주세요
      </h2>

      {/* 나이 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          나이
        </label>
        <input
          type="number"
          min="20"
          max="100"
          required
          value={formState.age}
          onChange={(e) => updateField('age', parseInt(e.target.value) || 30)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          연령대별 평균 축의금 참고용
        </p>
      </div>

      {/* 직업 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          직업
        </label>
        <input
          type="text"
          required
          value={formState.occupation}
          onChange={(e) => updateField('occupation', e.target.value)}
          placeholder="예: 회사원, 학생, 프리랜서 등"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      {/* 사용자 주소 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          출발 위치
        </label>
        <input
          type="text"
          required
          value={formState.userAddress}
          onChange={(e) => updateField('userAddress', e.target.value)}
          placeholder="예: 서울시 마포구"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">
          이동 거리 계산에 사용됩니다
        </p>
      </div>

      {/* 과거 축의금 수령 여부 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상대방에게 축의금을 받은 적이 있나요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: '예, 있습니다' },
            { value: false, label: '아니요' },
          ].map(option => (
            <button
              key={option.label}
              type="button"
              onClick={() => updateField('previousGiftReceived', option.value)}
              className={`py-3 rounded-lg border-2 font-medium transition-colors ${
                formState.previousGiftReceived === option.value
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 과거 받은 금액 */}
      {formState.previousGiftReceived && (
        <div className="animate-in slide-in-from-top">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            받은 축의금 금액
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="10000"
              required
              value={formState.previousGiftAmount}
              onChange={(e) => updateField('previousGiftAmount', parseInt(e.target.value) || 0)}
              placeholder="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            받은 금액을 고려하여 추천합니다
          </p>
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={isLoading}
          className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              분석 중...
            </>
          ) : (
            <>
              결과 보기
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}