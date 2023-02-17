import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prismaService: PrismaService) {}

  async getAll(userId: number) {
    return this.prismaService.statistic.findMany({
      where: {
        form: {
          userId,
        },
      },
    });
  }

  async update(formId: number) {
    const form = await this.prismaService.form.findUnique({
      where: { id: formId },
    });
    if (form.statisticId) {
      await this.prismaService.statistic.update({
        where: { id: form.statisticId },
        data: {
          hits: {
            increment: 1,
          },
        },
      });
    }
  }
}
