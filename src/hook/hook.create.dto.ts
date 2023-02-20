import { ApiProperty } from '@nestjs/swagger';
import { HookType, Prisma } from '@prisma/client';

export class HookCreateInput implements Prisma.HookCreateInput {
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  type: HookType;
}
