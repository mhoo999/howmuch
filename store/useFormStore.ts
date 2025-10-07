import { create } from 'zustand';
import { FormData, AIRecommendation } from '@/types';

interface FormStore {
  currentStep: number;
  formData: Partial<FormData>;
  recommendation: AIRecommendation | null;
  
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  updateRelationship: (data: Partial<FormData['relationship']>) => void;
  updateWedding: (data: Partial<FormData['wedding']>) => void;
  updateUser: (data: Partial<FormData['user']>) => void;
  
  setRecommendation: (recommendation: AIRecommendation) => void;
  reset: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  currentStep: 0,
  formData: {},
  recommendation: null,
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 3) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),
  
  updateRelationship: (data) => set((state) => ({
    formData: {
      ...state.formData,
      relationship: { ...state.formData.relationship, ...data } as any
    }
  })),
  
  updateWedding: (data) => set((state) => ({
    formData: {
      ...state.formData,
      wedding: { ...state.formData.wedding, ...data } as any
    }
  })),
  
  updateUser: (data) => set((state) => ({
    formData: {
      ...state.formData,
      user: { ...state.formData.user, ...data } as any
    }
  })),
  
  setRecommendation: (recommendation) => set({ recommendation }),
  
  reset: () => set({ 
    currentStep: 0, 
    formData: {}, 
    recommendation: null 
  })
}));