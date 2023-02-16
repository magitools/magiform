import { Module } from '@nestjs/common';
import { HookService } from './hook.service';
import { HookController } from './hook.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntegrationsModule } from 'src/integrations/integrations.module';

@Module({
  providers: [HookService],
  controllers: [HookController],
  imports: [PrismaModule, IntegrationsModule],
})
export class HookModule {}
