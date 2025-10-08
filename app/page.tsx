'use client';

import { useFormStore } from '@/store/useFormStore';
import { Gift, ArrowRight } from 'lucide-react';
import Step1RelationshipForm from '@/components/forms/Step1RelationshipForm';
import Step2WeddingForm from '@/components/forms/Step2WeddingForm';
import Step3UserForm from '@/components/forms/Step3UserForm';

export default function Home() {
  const { currentStep, nextStep } = useFormStore();

  if (currentStep > 0) {
    return <FormSteps />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <div className="bg-rose-100 p-3 sm:p-4 rounded-full">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-rose-600" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          얼마니
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          AI가 분석하는 적정 축의금
        </p>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
          <FeatureItem text="관계 깊이 분석" />
          <FeatureItem text="예식장 정보 자동 조사" />
          <FeatureItem text="지역 평균 비교" />
          <FeatureItem text="3단계 금액 추천" />
        </div>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            nextStep();
          }}
          className="w-full bg-rose-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          시작하기
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-4 sm:py-6 md:py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <StepIndicator />

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mt-4 sm:mt-6">
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
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm sm:text-base ${
            currentStep > index
              ? 'bg-rose-600 text-white'
              : currentStep === index + 1
              ? 'bg-rose-600 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 sm:w-12 h-1 mx-1 sm:mx-2 ${
              currentStep > index + 1 ? 'bg-rose-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
