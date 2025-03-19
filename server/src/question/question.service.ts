import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Question, QuestionType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from 'src/shared/dto';
import { validateQuestionType } from 'src/shared/utils/validateQuestionType';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: CreateQuestionDto[]): Promise<{ count: number }> {
    try {
      return await this.prisma.question.createMany({
        data: question.map((qDto) => ({
          ...qDto,
        })),
      });
    } catch (error) {
      throw new BadRequestException(
        'Error creating questions. Please check your data.',
      );
    }
  }

  // async update(id: string, data: UpdateQuestionDto): Promise<Question> {
  //   try {
  //     await this.ensureQuestionExists(id);
  //     return await this.prisma.question.update({
  //       where: { id },
  //       ...data,
  //     });
  //   } catch (error) {
  //     if (error instanceof NotFoundException) throw error;
  //     throw new InternalServerErrorException('Failed to update question');
  //   }
  // }

  // private async ensureQuestionExists(id: string): Promise<Question> {
  //   const question = await this.prisma.question.findUnique({
  //     where: { id },
  //     include: { options: true },
  //   });

  //   if (!question) {
  //     throw new NotFoundException(`Question with ID ${id} not found`);
  //   }

  //   return question;
  // }
}
