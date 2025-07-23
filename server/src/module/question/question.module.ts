import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { PrismaService } from "../../../prisma/prisma.service";


@Module({
  providers: [QuestionService, PrismaService],
  exports: [QuestionService],
})
export class QuestionModule {}
