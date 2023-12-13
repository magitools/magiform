import { Module } from '@nestjs/common';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import { AppController } from './app.controller';
import * as schema from "./db"
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { HookModule } from './hook/hook.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    DrizzleTursoModule.register({
      tag:"DB",
      turso: {
        config: {
          url: process.env.DB_URL,
          authToken: process.env.DB_TOKEN
        }
      },
      config: { schema: { ...schema } }
    }),
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
