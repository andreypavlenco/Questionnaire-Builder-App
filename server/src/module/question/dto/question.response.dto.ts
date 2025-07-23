import { AnswerOptionResponseDto } from "module/user-answer/dto/answer-option.response.dto";
import { QuestionType } from "shared/enums/question-type.enum";


export class QuestionResponseDto {
  id: string;
  text: string;
  type: QuestionType;
  order?: number;
  options: AnswerOptionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
