export type CardType = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  completions: number;
  passCount: number;
};

export type AnswerOptionType = {
  id: string;
  text: string;
};

export type QuestionType = {
  id: string;
  text: string;
  type: "TEXT" | "CHOICE";
  quizId: string;
  options: AnswerOptionType[];
};

export type QuizType = {
  id: string;
  title: string;
  description?: string;
  passCount: number;
  questionCount: number;
  questions: QuestionType[];
};