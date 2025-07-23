import { IsString, IsEnum, IsOptional, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from 'shared/enums/question-type.enum';
import { CreateAnswerOptionDto } from 'module/user-answer/dto/create-answer-option.dto';


export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerOptionDto)
  options: CreateAnswerOptionDto[];
}
