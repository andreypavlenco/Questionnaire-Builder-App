import { IsUUID } from 'class-validator';

export class CreateQuizSessionDto {
  @IsUUID()
  quizId: string;

  @IsUUID()
  userId: string;
}
