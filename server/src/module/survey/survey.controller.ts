import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from '@prisma/client';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async getAll(): Promise<Survey[]> {
    return this.surveyService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Survey | null> {
    return this.surveyService.getById(id);
  }

  @Post()
  async create(@Body() data: Survey): Promise<Survey> {
    return this.surveyService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Survey>,
  ): Promise<Survey> {
    return this.surveyService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Survey> {
    return this.surveyService.delete(id);
  }
}
