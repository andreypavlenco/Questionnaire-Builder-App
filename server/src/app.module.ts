import { QuestionModule } from './question/question.module';
import { QuizModule } from './quiz/quiz.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [QuestionModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
