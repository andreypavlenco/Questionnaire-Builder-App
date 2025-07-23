import { IsString } from 'class-validator';

export class CreateAnswerOptionDto {
  @IsString()
  text: string;
}
