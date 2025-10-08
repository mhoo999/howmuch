'use client';

import { useState } from 'react';
import { useFormStore } from '@/store/useFormStore';
import { ArrowRight, ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { WeddingInfo } from '@/types';

export default function Step2WeddingForm() {
  const { formData, updateWedding, nextStep, prevStep } = useFormStore();
  const wedding = (formData.wedding || {}) as Partial<WeddingInfo>;

  const [formState, setFormState] = useState({
    venueName: wedding.venueName || '',
    venueAddress: wedding.venueAddress || '',
    weddingDate: wedding.weddingDate || new Date(),
    mealIncluded: wedding.mealIncluded ?? true,
    accompanyingGuests: wedding.accompanyingGuests || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding(formState);
    nextStep();
  };

  const updateField = (field: string, value: string | number | boolean | Date) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        예식 정보를 알려주세요
      </h2>

      {/* 예식장 주소 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          예식장 주소
        </label>
        <input
          type="text"
          required
          value={formState.venueAddress}
          onChange={(e) => updateField('venueAddress', e.target.value)}
          placeholder="예: 서울시 강남구 테헤란로 123"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-black placeholder:text-gray-400"
        />
        <p className="text-sm text-gray-500 mt-1">
          AI가 예식장 정보와 거리를 분석합니다
        </p>
      </div>

      {/* 예식 날짜 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          예식 날짜
        </label>
        <input
          type="date"
          required
          value={formState.weddingDate instanceof Date 
            ? formState.weddingDate.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
          }
          onChange={(e) => updateField('weddingDate', new Date(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-black placeholder:text-gray-400"
        />
      </div>

      {/* 식사 포함 여부 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          식사가 포함되나요?
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { value: true, label: '예, 포함됩니다' },
            { value: false, label: '아니요' },
          ].map(option => (
            <button
              key={option.label}
              type="button"
              onClick={() => updateField('mealIncluded', option.value)}
              className={`py-2 sm:py-3 rounded-lg border-2 font-medium transition-colors text-sm sm:text-base ${
                formState.mealIncluded === option.value
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 동반 인원 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          함께 가는 인원 (본인 제외)
        </label>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[0, 1, 2, 3].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => updateField('accompanyingGuests', num)}
              className={`py-2 sm:py-3 rounded-lg border-2 font-medium transition-colors text-sm sm:text-base ${
                formState.accompanyingGuests === num
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {num}명
            </button>
          ))}
        </div>
        {formState.accompanyingGuests > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            동반 인원의 식대도 고려하여 계산합니다
          </p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 sm:gap-3 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 py-3 sm:py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          이전
        </button>
        <button
          type="submit"
          className="flex-1 bg-rose-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          다음
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </form>
  );
}