import { BadRequestException } from '@nestjs/common';
import { QuestionType } from '@prisma/client';

export function validateQuestionType(type: string): QuestionType {
  if (Object.values(QuestionType).includes(type as QuestionType)) {
    return type as QuestionType;
  }
  throw new BadRequestException(`Invalid question type: ${type}`);
}
