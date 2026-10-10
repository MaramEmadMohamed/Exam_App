export interface QuestionAnswer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: QuestionAnswer[];
}

export interface QuestionsResponse {
  status: boolean;
  code: number;
  payload: {
    questions: Question[];
  };
}