import { PrismaService } from 'prisma/prisma.service';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService, PrismaService],
})
export class SurveyModule {}
