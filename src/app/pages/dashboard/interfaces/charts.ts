interface AnswersByResultTypeData {
  name: string;
  value: number;
  percentage: number;
}

export interface AnswersByResultType {
  types: string[];
  data: AnswersByResultTypeData[];
}

export interface ComparativeResultType {
  name: string;
  data: number[];
}

export interface ComparativeTries {
  total_tries: number;
  total_applied_tries: number;
}