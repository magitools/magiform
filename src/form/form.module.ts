import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [PrismaModule, StatisticsModule],
})
export class FormModule {}
