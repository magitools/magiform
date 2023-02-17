import { Prisma } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Base } from 'src/integrations/Base';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { FormCreateDTO } from './form.create.dto';

@Injectable()
export class FormService {
  constructor(
    private prismaService: PrismaService,
    private statisticService: StatisticsService,
  ) {}

  async getAll(userId: number) {
    return this.prismaService.form.findMany({
      where: { userId },
      include: {
        webhooks: { select: { name: true } },
        statistic: { select: { hits: true } },
      },
    });
  }

  async get(userId: number, formId: number) {
    const form = await this.prismaService.form.findUnique({
      where: { id: formId },
    });
    if (form.userId !== userId) throw UnauthorizedException;
    return form;
  }

  async delete(userId: number, formId: number) {
    const form = await this.prismaService.form.findUnique({
      where: { id: formId },
    });
    if (form.userId !== userId) throw UnauthorizedException;
    return await this.prismaService.form.delete({ where: { id: formId } });
  }

  async create(userId: number, data: FormCreateDTO) {
    const form = await this.prismaService.form.create({
      data: {
        ...data.form,
        user: { connect: { id: userId } },
        statistic: { create: { hits: 0 } },
      },
    });
    const hooks = await this.prismaService.hook.createMany({
      data: data.hooks.map((e) => ({ ...e, formId: form.id })),
    });
    return { form, hooks };
  }

  async trigger(origin: string, formId: number, data: Object) {
    //TODO handle form data
    const form = await this.prismaService.form.findUnique({
      where: { id: formId },
      include: {
        webhooks: {
          where: {
            enabled: true,
          },
        },
      },
    });
    if (
      !form?.allowedOrigins.split(';').includes(origin) &&
      !form?.allowedOrigins.split(';').includes('*')
    ) {
      throw UnauthorizedException;
    }
    form.webhooks.forEach(async (hook) => {
      const { default: handler } =
        await require(`../integrations/${hook.type}.hook`);
      await new handler(hook.url, data, form.name).sendHook();
    });
    await this.statisticService.update(form.id);
  }
}
