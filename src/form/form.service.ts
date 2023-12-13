import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import * as schema from "../db"
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class FormService {
  constructor(
    private statisticService: StatisticsService,
    @Inject("DB") private dbService: LibSQLDatabase<typeof schema>,
  ) {}

  async getAll(userId: number) {
    return this.dbService.query.forms.findMany({
      where: eq(schema.forms.user, userId),
      with: {

      }
    })
  }

  async get(userId: number, formId: number) {
    const form = await this.dbService.query.forms.findFirst({where: eq(schema.forms.id, formId)})
    if (form.user !== userId) throw UnauthorizedException;
    return form;
  }

  async delete(userId: number, formId: number) {
    const form = await this.get(userId, formId);
    if (form.user !== userId) throw UnauthorizedException;
    await this.dbService.delete(schema.hooks).where(eq(schema.hooks.form, formId))
    return await this.dbService.delete(schema.forms).where(eq(schema.forms.id, formId))
  }

/*   async create(userId: number, data: FormCreateDTO) {
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
  } */
}
