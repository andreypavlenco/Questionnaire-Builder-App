import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Prisma, Survey } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Survey[]> {
    try {
      return await this.prisma.survey.findMany({
        include: { questions: true, surveySessions: true },
      });
    } catch (error) {
      this.logger.error('Error retrieving surveys list', error);
      throw new InternalServerErrorException(
        'Failed to retrieve the list of surveys',
      );
    }
  }

  async getById(id: string): Promise<Survey | null> {
    try {
      const survey = await this.prisma.survey.findUnique({
        where: { id },
        include: { questions: true, surveySessions: true },
      });

      if (!survey) {
        this.logger.warn(`Survey with ID ${id} not found`);
        throw new NotFoundException(`Survey with ID ${id} not found`);
      }

      return survey;
    } catch (error) {
      this.logger.error(`Error retrieving survey with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to retrieve the survey');
    }
  }

  async create(data: Prisma.SurveyCreateInput): Promise<Survey> {
    try {
      return await this.prisma.survey.create({ data });
    } catch (error) {
      this.logger.error('Error creating survey', error);
      throw new BadRequestException(
        'Error creating survey. Please check your data.',
      );
    }
  }

  async update(id: string, data: Prisma.SurveyUpdateInput): Promise<Survey> {
    try {
      const survey = await this.prisma.survey.findUnique({ where: { id } });

      if (!survey) {
        this.logger.warn(
          `Attempt to update a non-existent survey with ID ${id}`,
        );
        throw new NotFoundException(`Survey with ID ${id} not found`);
      }

      return await this.prisma.survey.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(`Error updating survey with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to update the survey');
    }
  }

  async delete(id: string): Promise<Survey> {
    try {
      const survey = await this.prisma.survey.findUnique({ where: { id } });

      if (!survey) {
        this.logger.warn(
          `Attempt to delete a non-existent survey with ID ${id}`,
        );
        throw new NotFoundException(`Survey with ID ${id} not found`);
      }

      return await this.prisma.survey.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting survey with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to delete the survey');
    }
  }
}
