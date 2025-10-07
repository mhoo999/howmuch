import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 만원 단위 포맷팅
export function formatAmount(amount: number): string {
  return `${amount}만원`;
}

// 만원을 원으로 변환 (필요시)
export function toWon(manwon: number): number {
  return manwon * 10000;
}

// 원을 만원으로 변환 (필요시)
export function toManwon(won: number): number {
  return won / 10000;
}