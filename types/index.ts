// 관계 정보
export interface RelationshipInfo {
    name: string;
    meetingPlace: 'school' | 'work' | 'hobby' | 'family' | 'other';
    meetingPlaceDetail?: string;
    yearsKnown: number;
    monthsKnown: number;
    oneOnOneMeetings: number;
    contactFrequency: 'daily' | 'weekly' | 'monthly' | 'occasionally';
    mutualFriends: number;
  }
  
  // 예식 정보
  export interface WeddingInfo {
    venueName: string;
    venueAddress: string;
    weddingDate: Date;
    mealIncluded: boolean;
    accompanyingGuests: number;
  }
  
  // 사용자 정보
  export interface UserInfo {
    age: number;
    occupation: string;
    userAddress: string;
    previousGiftReceived: boolean;
    previousGiftAmount?: number;
  }
  
  // AI 분석 결과
  export interface AIRecommendation {
    minimum: number;
    recommended: number;
    generous: number;
    reasoning: {
      relationshipScore: number;
      venueScore: number;
      distanceScore: number;
      reciprocityScore: number;
    };
    explanation: string;
    regionalAverage: number;
    distance: number;
    travelCost: number;
  }
  
  // 전체 폼 데이터
  export interface FormData {
    relationship: RelationshipInfo;
    wedding: WeddingInfo;
    user: UserInfo;
  }