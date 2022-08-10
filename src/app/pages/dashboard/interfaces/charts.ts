interface AnswersByResultTypeData {
  name: string;
  value: number;
  percentage: number;
}

export interface AnswersByResultType {
  types: string[];
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