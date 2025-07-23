import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { CreateQuestionDto } from "module/question/dto/question-create.dto";
import { CreateQuizSessionDto } from "module/quiz-session/dto/create-quiz-session.dto";
import { QuizSessionResponseDto } from "module/quiz-session/dto/quiz-session.response.dto";
import { CreateUserDto } from "module/user/dto/create-user.dto";

export class QuizDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsInt()
  @IsOptional()
  passCount?: number;

  @IsInt()
  @IsOptional()
  questionCount?: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizSessionDto)
  quizSession: CreateQuizSessionDto[];

  @IsNotEmpty()
  @IsString()
  userId: String;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
