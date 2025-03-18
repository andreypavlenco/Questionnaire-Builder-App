import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from '@prisma/client';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/survey/:surveyId')
  async getAllBySurvey(
    @Param('surveyId') surveyId: string,
  ): Promise<Question[]> {
    return this.questionService.getAllBySurvey(surveyId);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Question | null> {
    return this.questionService.getById(id);
  }

  @Post('/survey/:surveyId')
  async create(
    @Param('surveyId') surveyId: string,
    @Body() data: Pick<Question, 'text' | 'type' | 'order'>,
  ): Promise<Question> {
    return this.questionService.create(surveyId, data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Question>,
  ): Promise<Question> {
    return this.questionService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Question> {
    return this.questionService.delete(id);
  }
}
