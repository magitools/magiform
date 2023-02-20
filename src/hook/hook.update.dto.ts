import { ApiProperty } from '@nestjs/swagger';
import { HookType, Prisma } from '@prisma/client';

export class HookUpdateInput implements Prisma.HookUpdateInput {
  @ApiProperty({ nullable: true })
  name?: string;
  @ApiProperty({ nullable: true })
  url?: string;
  @ApiProperty({ nullable: true })
  enabled?: boolean;
  @ApiProperty({ nullable: true })
  type?: HookType;
}
