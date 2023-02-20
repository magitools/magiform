import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class FormUpdateInput implements Prisma.FormUpdateInput {
  @ApiProperty({ nullable: true })
  name?: string;
  @ApiProperty({
    description: 'list of origins separated by ;',
    nullable: true,
  })
  allowedOrigins?: string;
  @ApiProperty({ nullable: true })
  redirectUrl?: string;
}
