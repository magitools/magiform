import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HookService {
  constructor(
    private prismaService: PrismaService,
    @Inject('HOOK_INTEGRATIONS')
    private hookIntegrations,
  ) {}

  async getTypes() {
    console.log(this.hookIntegrations);
    return this.hookIntegrations;
  }

  async delete(userId: number, hookId: number) {
    const form = await this.prismaService.form.findFirst({
      where: { userId, webhooks: { some: { id: hookId } } },
    });
    if (form) {
      return this.prismaService.hook.delete({ where: { id: hookId } });
    } else {
      throw UnauthorizedException;
    }
  }
}
