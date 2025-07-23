export class UserAnswerResponseDto {
  id: string;
  quizSessionId: string;
  questionId: string;
  userId: string;
  answerText?: string;
  selectedOptions: string[];
  createdAt: Date;
}
