import { Module } from '@nestjs/common';
import { integrationsProvider } from './integrations.provider';

@Module({
  providers: [...integrationsProvider],
  exports: [...integrationsProvider],
})
export class IntegrationsModule {}
