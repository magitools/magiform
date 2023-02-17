import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { HookModule } from './hook/hook.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    FormModule,
    HookModule,
    IntegrationsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
