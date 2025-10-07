'use client';

import { useFormStore } from '@/store/useFormStore';
import { Gift, ArrowRight } from 'lucide-react';

export default function Home() {
  const { currentStep, nextStep } = useFormStore();

  if (currentStep > 0) {
    return <FormSteps />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-rose-100 p-4 rounded-full">
            <Gift className="w-12 h-12 text-rose-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          얼마낼까
        </h1>
        <p className="text-gray-600 mb-8">
          AI가 분석하는 적정 축의금
        </p>
        
        <div className="space-y-4 mb-8 text-left">
          <FeatureItem text="관계 깊이 분석" />
          <FeatureItem text="예식장 정보 자동 조사" />
          <FeatureItem text="지역 평균 비교" />
          <FeatureItem text="3단계 금액 추천" />
        </div>
        
        <button
          onClick={nextStep}
          className="w-full bg-rose-600 text-white py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
        >
          시작하기
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-rose-500 rounded-full" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

function FormSteps() {
  const { currentStep } = useFormStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <StepIndicator />
        
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          {currentStep === 1 && <Step1RelationshipForm />}
          {currentStep === 2 && <Step2WeddingForm />}
          {currentStep === 3 && <Step3UserForm />}
        </div>
      </div>
    </div>
  );
}

function StepIndicator() {
  const { currentStep } = useFormStore();
  const steps = ['관계 정보', '예식 정보', '추가 정보'];
  
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
            currentStep > index 
              ? 'bg-rose-600 text-white' 
              : currentStep === index + 1
              ? 'bg-rose-600 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-1 mx-2 ${
              currentStep > index + 1 ? 'bg-rose-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// 임시 폼 컴포넌트들 (다음 단계에서 구현)
function Step1RelationshipForm() {
  return <div className="text-center py-12">Step 1: 관계 정보 입력</div>;
}

function Step2WeddingForm() {
  return <div className="text-center py-12">Step 2: 예식 정보 입력</div>;
}

function Step3UserForm() {
  return <div className="text-center py-12">Step 3: 추가 정보 입력</div>;
}