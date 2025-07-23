
import { QuizService } from "./quiz.service";
import { Module } from "@nestjs/common";
import { QuestionModule } from "../question/question.module";
import { QuizController } from "./quiz.controller";
import { PrismaService } from "../../../prisma/prisma.service";

@Module({
  imports: [QuestionModule],
  controllers: [QuizController],
  providers: [QuizService, PrismaService],
  exports: [QuizService],
})
export class QuizModule {}
