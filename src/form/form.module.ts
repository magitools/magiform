import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [StatisticsModule],
  exports: [FormService]
})
export class FormModule {}
