export const MODEL_TYPES = ['Sınıflandırma', 'Regresyon', 'Derin Öğrenme', 'Kümeleme'] as const;
export type ModelType = (typeof MODEL_TYPES)[number];

export interface Experiment {
  id: string;
  title: string;
  model: string;
  type: ModelType;
  dataset: string;
  score: number; // 0-100 başarı metriği
  notes: string;
  createdAt: string;
}
export type ExperimentInput = Omit<Experiment, 'id' | 'createdAt'>;
