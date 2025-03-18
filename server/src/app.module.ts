import { QuestionModule } from './module/question/question.module';
import { QuestionService } from './module/question/question.service';
import { QuestionController } from './module/question/question.controller';
import { SurveyModule } from './module/survey/survey.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [QuestionModule, SurveyModule],
  controllers: [QuestionController, AppController],
  providers: [QuestionService, AppService],
})
export class AppModule {}
