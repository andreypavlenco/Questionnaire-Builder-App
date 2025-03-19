import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  @IsOptional()
  options?: AnswerOptionDto[];

  @IsUUID()
  quizId: string;
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsOptional()
  @IsInt()
  questionCount?: number;
}
export class AnswerOptionDto {
  @IsUUID()
  id: string;

  @IsString()
  text: string;
}

export class UpdateQuestionDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsEnum(QuestionType)
  type?: QuestionType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  options?: AnswerOptionDto[];
}

export class CreateUserAnswerDto {
  @IsUUID()
  quizSessionId: string; // Сессия пользователя

  @IsUUID()
  questionId: string; // ID вопроса

  @IsOptional()
  @IsString()
  answerText?: string; // Текстовый ответ (если вопрос TEXT)

  @IsOptional()
  @IsArray()
  selectedOptions?: string[]; // Список ID выбранных вариантов ответа
}

export class CreateQuizSessionDto {
  @IsUUID()
  quizId: string; // ID квиза

  @IsArray()
  answers: CreateUserAnswerDto[]; // Список ответов пользователя

  @IsOptional()
  completed?: boolean; // Флаг завершения квиза

  @IsOptional()
  timeTaken?: number; // Время, затраченное на прохождение
}

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  questionCount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions?: UpdateQuestionDto[];
}
