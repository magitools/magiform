import { ApiProperty } from '@nestjs/swagger';
import { HookType, Prisma } from '@prisma/client';

class FormCreateInput implements Prisma.FormCreateInput {
  @ApiProperty()
  name: string;
  webhooks?: Prisma.HookCreateNestedManyWithoutFormsInput;
  @ApiProperty({ description: 'list of origins separated by ;' })
  allowedOrigins: string;
  statistic: Prisma.StatisticCreateNestedOneWithoutFormInput;
}

class HookCreateInput implements Prisma.HookCreateInput {
  @ApiProperty()
  name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  type: HookType;
}

export class FormCreateDTO {
  @ApiProperty()
  form: FormCreateInput;
  @ApiProperty({ isArray: true, type: HookCreateInput })
  hooks: HookCreateInput[];
}
