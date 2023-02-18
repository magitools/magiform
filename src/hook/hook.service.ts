import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HookService {
  constructor(
    private prismaService: PrismaService,
    @Inject('HOOK_INTEGRATIONS')
    private hookIntegrations,
  ) {}

  private async verifyForm(userId: number, hookId: number) {
    const form = await this.prismaService.form.findFirst({
      where: { userId, webhooks: { some: { id: hookId } } },
    });
    if (!form) {
      throw UnauthorizedException;
    }
  }

  async getTypes() {
    console.log(this.hookIntegrations);
    return this.hookIntegrations;
  }

  async create(userId: number, formId: number, data: Prisma.HookCreateInput) {
    const form = await this.prismaService.form.findFirst({
      where: { userId, id: formId },
    });
    if (!form) {
      throw UnauthorizedException;
    }
    const hook = await this.prismaService.hook.create({
      data: { forms: { connect: { id: formId } }, ...data },
    });
    return hook;
  }

  async delete(userId: number, hookId: number) {
    await this.verifyForm(userId, hookId);
    return this.prismaService.hook.delete({ where: { id: hookId } });
  }

  async update(userId: number, hookId: number, data: Prisma.HookUpdateInput) {
    await this.verifyForm(userId, hookId);
    return await this.prismaService.hook.update({
      where: { id: hookId },
      data,
    });
  }
}
