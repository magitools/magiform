import { Inject, Injectable } from '@nestjs/common';
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
}
