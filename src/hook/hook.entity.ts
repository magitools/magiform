import { ApiProperty } from '@nestjs/swagger';
import { Hook, HookType } from '@prisma/client';

export class HookEntity implements Hook {
  @ApiProperty()
  id: number;
  @ApiProperty()
  formId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  enabled: boolean;
  @ApiProperty()
  type: HookType;
}
