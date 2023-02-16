import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [PrismaModule]
})
export class FormModule {}
