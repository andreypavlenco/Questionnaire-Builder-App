/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { QuestionType, Quiz } from '@prisma/client';
import {
  CreateQuestionDto,
  CreateQuizDto,
  UpdateQuizDto,
} from 'src/shared/dto';
import { validateQuestionType } from 'src/shared/utils/validateQuestionType';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionsService: QuestionService,
  ) {}

  async getAll(): Promise<Quiz[]> {
    try {
      return await this.prisma.quiz.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch quizzes');
    }
  }

  async getById(id: string): Promise<Quiz> {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id },
        include: {
          questions: {
            include: { options: true },
          },
        },
      });

      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${id} not found`);
      }
      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch quiz');
    }
  }

  async create(dto: CreateQuizDto): Promise<Quiz> {
    try {
      const quiz = await this.prisma.quiz.create({
        data: {
          title: dto.title,
          description: dto.description || undefined,
          passCount: 0,
          questionCount: dto.questions.length,
          questions: {
            create: dto.questions.map((q) => ({
              text: q.text,
              type: q.type,
              options: q.options
                ? { create: q.options.map((o) => ({ text: o.text })) }
                : undefined,
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      return quiz;
    } catch (error) {
      throw new BadRequestException(
        'Error creating quiz. Please check your data.',
      );
    }
  }

  async update(id: string, dto: UpdateQuizDto): Promise<Quiz> {
    try {
      const updatedQuiz = await this.prisma.quiz.update({
        where: { id },
        data: {
          title: dto.title,
          description: dto.description,
          questionCount: dto.questions ? dto.questions.length : 0,
          questions: {
            upsert: dto.questions?.map((question) => ({
              where: { id: question.id },
              update: {
                text: question.text || '',
                type: question.type || 'TEXT',
                options:
                  question.options && question.options.length > 0
                    ? {
                        set: question.options.map((option) => ({
                          id: option.id,
                          text: option.text || '',
                        })),
                      }
                    : { set: [] },
              },
              create: {
                id: question.id,
                text: question.text || '',
                type: question.type || 'TEXT',
                options:
                  question.options && question.options.length > 0
                    ? {
                        create: question.options.map((option) => ({
                          id: option.id,
                          text: option.text || '',
                        })),
                      }
                    : undefined,
              },
            })),
          },
        },
      });

      console.log('✅ Quiz updated successfully:', updatedQuiz);
      return updatedQuiz;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update quiz');
    }
  }

  async delete(id: string): Promise<Quiz> {
    try {
      return await this.prisma.quiz.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete quiz');
    }
  }
}
