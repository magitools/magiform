import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        webhooks: {},
        statistic: {},
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
    await this.prismaService.hook.deleteMany({ where: { formId } });
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

  async update(userId: number, formId: number, data: Prisma.FormUpdateInput) {
    const form = await this.prismaService.form.findUnique({
      where: { id: formId },
    });
    if (form.userId !== userId) {
      throw UnauthorizedException;
    }
    return await this.prismaService.form.update({
      where: { id: formId },
      data,
    });
  }

  async trigger(origin: string, formId: number, data: Object, files: Array<Express.Multer.File>) {
    //TODO handle form data
    console.log(files)
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
      await new handler(hook.url, data, form.name, files).sendHook();
    });
    await this.statisticService.update(form.id);
    return form.redirectUrl || null;
  }
}
