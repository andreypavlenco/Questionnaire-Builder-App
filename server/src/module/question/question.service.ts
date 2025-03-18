import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(private prisma: PrismaService) {}

  async getAllBySurvey(surveyId: string): Promise<Question[]> {
    try {
      return await this.prisma.question.findMany({
        where: { surveyId },
        include: { options: true },
      });
    } catch (error) {
      this.logger.error('Error fetching questions', error);
      throw new InternalServerErrorException('Failed to retrieve questions');
    }
  }

  async getById(id: string): Promise<Question | null> {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id },
        include: { options: true },
      });

      if (!question) {
        this.logger.warn(`Question with ID ${id} not found`);
        throw new NotFoundException(`Question with ID ${id} not found`);
      }

      return question;
    } catch (error) {
      this.logger.error(`Error fetching question with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to retrieve the question');
    }
  }

  async create(
    surveyId: string,
    data: Omit<Prisma.QuestionCreateInput, 'survey'>,
  ): Promise<Question> {
    try {
      this.logger.log(`Creating question for survey ID: ${surveyId}`);

      const question = await this.prisma.question.create({
        data: {
          text: data.text,
          type: data.type,
          order: data.order,
          survey: { connect: { id: surveyId } },
        },
      });

      this.logger.log(`Question created successfully: ${question.id}`);
      return question;
    } catch (error) {
      this.logger.error(
        `Error creating question for survey ID: ${surveyId}`,
        error,
      );

      throw new BadRequestException(
        'Failed to create question. Check your data.',
      );
    }
  }

  async update(
    id: string,
    data: Prisma.QuestionUpdateInput,
  ): Promise<Question> {
    try {
      const question = await this.prisma.question.findUnique({ where: { id } });

      if (!question) {
        this.logger.warn(
          `Attempt to update a non-existent question with ID ${id}`,
        );
        throw new NotFoundException(`Question with ID ${id} not found`);
      }

      return await this.prisma.question.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(`Error updating question with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to update question');
    }
  }

  async delete(id: string): Promise<Question> {
    try {
      const question = await this.prisma.question.findUnique({ where: { id } });

      if (!question) {
        this.logger.warn(
          `Attempt to delete a non-existent question with ID ${id}`,
        );
        throw new NotFoundException(`Question with ID ${id} not found`);
      }

      return await this.prisma.question.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting question with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to delete question');
    }
  }
}
