import { IsUUID, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateUserAnswerDto {
  @IsUUID()
  quizSessionId: string;

  @IsUUID()
  questionId: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  answerText?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  selectedOptions?: string[];
}
