import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { Quiz } from "@prisma/client";

@Controller("quiz")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAll(): Promise<Quiz[]> {
    return await this.quizService.getAll();
  }

  // @Get(":id")
  // async getById(@Param("id") id: string): Promise<Quiz> {
  //   return await this.quizService.getById(id);
  // }

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() data: CreateQuizDto): Promise<Quiz> {
  //   return await this.quizService.create(data);
  // }

  // @Put(":id")
  // async update(
  //   @Param("id") id: string,
  //   @Body() data: UpdateQuizDto,
  // ): Promise<Quiz> {
  //   return await this.quizService.update(id, data);
  // }

  // @Delete(":id")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param("id") id: string): Promise<void> {
  //   await this.quizService.delete(id);
  // }
}
