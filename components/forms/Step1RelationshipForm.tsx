'use client';

import { useState } from 'react';
import { useFormStore } from '@/store/useFormStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { RelationshipInfo } from '@/types';

export default function Step1RelationshipForm() {
  const { formData, updateRelationship, nextStep, prevStep } = useFormStore();
  const relationship = (formData.relationship || {}) as Partial<RelationshipInfo>;

  const [formState, setFormState] = useState({
    name: relationship.name || '',
    meetingPlace: relationship.meetingPlace || 'school',
    meetingPlaceDetail: relationship.meetingPlaceDetail || '',
    yearsKnown: relationship.yearsKnown || 0,
    monthsKnown: relationship.monthsKnown || 0,
    oneOnOneMeetings: relationship.oneOnOneMeetings || 0,
    contactFrequency: relationship.contactFrequency || 'monthly',
    mutualFriends: relationship.mutualFriends || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRelationship(formState);
    nextStep();
  };

  const updateField = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        관계 정보를 알려주세요
      </h2>

      {/* 이름 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          결혼하는 분 이름
        </label>
        <input
          type="text"
          required
          value={formState.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="예: 김철수"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      {/* 알게 된 장소 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          어디서 알게 되셨나요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'school', label: '학교' },
            { value: 'work', label: '직장' },
            { value: 'hobby', label: '동호회' },
            { value: 'family', label: '친척' },
            { value: 'other', label: '기타' },
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('meetingPlace', option.value)}
              className={`py-3 rounded-lg border-2 font-medium transition-colors ${
                formState.meetingPlace === option.value
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {formState.meetingPlace === 'other' && (
          <input
            type="text"
            value={formState.meetingPlaceDetail}
            onChange={(e) => updateField('meetingPlaceDetail', e.target.value)}
            placeholder="어디서 알게 되셨나요?"
            className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
          />
        )}
      </div>

      {/* 알고 지낸 기간 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          얼마나 알고 지내셨나요?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              min="0"
              max="50"
              value={formState.yearsKnown}
              onChange={(e) => updateField('yearsKnown', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
            />
            <span className="text-sm text-gray-600 mt-1 block">년</span>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="11"
              value={formState.monthsKnown}
              onChange={(e) => updateField('monthsKnown', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
            />
            <span className="text-sm text-gray-600 mt-1 block">개월</span>
          </div>
        </div>
      </div>

      {/* 1:1 만남 횟수 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          최근 1년간 따로 만난 횟수
        </label>
        <input
          type="number"
          min="0"
          value={formState.oneOnOneMeetings}
          onChange={(e) => updateField('oneOnOneMeetings', parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          단체 모임 제외, 1:1 또는 소수 모임만
        </p>
      </div>

      {/* 연락 빈도 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          얼마나 자주 연락하나요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'daily', label: '거의 매일' },
            { value: 'weekly', label: '주 1회 이상' },
            { value: 'monthly', label: '월 1회 정도' },
            { value: 'occasionally', label: '가끔' },
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateField('contactFrequency', option.value)}
              className={`py-3 rounded-lg border-2 font-medium transition-colors ${
                formState.contactFrequency === option.value
                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 공통 지인 수 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          공통으로 아는 친구가 몇 명인가요?
        </label>
        <input
          type="number"
          min="0"
          value={formState.mutualFriends}
          onChange={(e) => updateField('mutualFriends', parseInt(e.target.value) || 0)}
          placeholder="0"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          이전
        </button>
        <button
          type="submit"
          className="flex-1 bg-rose-600 text-white py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
        >
          다음
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}