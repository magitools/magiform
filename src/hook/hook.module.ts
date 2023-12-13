import { Module } from '@nestjs/common';
import { HookService } from './hook.service';
import { HookController } from './hook.controller';
import { IntegrationsModule } from 'src/integrations/integrations.module';
import { FormService } from 'src/form/form.service';

@Module({
  providers: [HookService],
  controllers: [HookController],
  imports: [FormService, IntegrationsModule],
})
export class HookModule {}
