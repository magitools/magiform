import { ApiProperty } from '@nestjs/swagger';
import { Statistic } from '@prisma/client';

export class StatisticsEntity implements Statistic {
  @ApiProperty()
  id: number;
  @ApiProperty()
  hits: number;
}
