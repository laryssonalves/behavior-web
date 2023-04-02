interface AnswersByResultTypeData {
  name: string;
  value: number;
  percentage: number;
}

export interface AnswersByResultType {
  data: AnswersByResultTypeData[];
}

export interface ComparativeTries {
  total_tries: number;
  total_applied_tries: number;
}

export interface ComparativeData {
  name: string;
  data: number[];
}

export interface ComparativeDataByConsultationData {
  name: string;
  value: number;
  id: number;
  date: string;
}

export interface ComparativeDataByConsultation {
  name: string;
  data: ComparativeDataByConsultationData[]
}