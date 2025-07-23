import { QuestionResponseDto } from "module/question/dto/question.response.dto";


export class QuizResponseDto {
  id: string;
  title: string;
  description?: string;
  passCount?: number;
  questionCount?: number;
  questions: QuestionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
