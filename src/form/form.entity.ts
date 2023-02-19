import { ApiProperty } from '@nestjs/swagger';
import { Form, Hook } from '@prisma/client';
import { HookEntity } from 'src/hook/hook.entity';
import { StatisticsEntity } from 'src/statistics/statistic.entity';

export class FormEntity implements Form {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  allowedOrigins: string;
  @ApiProperty()
  statisticId: number;
  @ApiProperty()
  redirectUrl: string;
}

export class FormListEntity extends FormEntity {
  @ApiProperty({ isArray: true, type: HookEntity })
  webhooks: HookEntity[];
  @ApiProperty({ type: StatisticsEntity })
  statistic: StatisticsEntity;
}

export class FormCreatedEntity {
  @ApiProperty()
  form: FormEntity;
  @ApiProperty({ isArray: true, type: HookEntity })
  hooks: HookEntity[];
}
