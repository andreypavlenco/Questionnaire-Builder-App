import { UserAnswerResponseDto } from "module/user-answer/dto/user-answer.response.dto";

export class QuizSessionResponseDto {
  id: string;
  quizId: string;
  userId: string;
  completed: boolean;
  timeTaken?: number;
  createdAt: Date;
  updatedAt: Date;
  userAnswers: UserAnswerResponseDto[];
}
