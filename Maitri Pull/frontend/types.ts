export type EmotionalState = 'Calm' | 'Stressed' | 'Fatigued' | 'Anxious' | 'Neutral';

export interface Vitals {
  heartRate: number;
  fatigueIndex: number; // 0 to 1
  posture: 'Good' | 'Poor' | 'N/A';
}

export interface EmotionHistoryEntry {
  timestamp: number;
  emotion: EmotionalState;
}

export interface VitalsHistoryEntry {
  timestamp: number;
  vitals: Vitals;
}

export interface CrewMember {
  id: string;
  name: string;
  emotion: EmotionalState;
  vitals?: Vitals;
  emotionHistory?: EmotionHistoryEntry[];
  vitalsHistory?: VitalsHistoryEntry[];
}
