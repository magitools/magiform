import { Prisma } from '@prisma/client';

export interface FormCreateDTO {
  form: Prisma.FormCreateInput;
  hooks: Prisma.HookCreateInput[];
}
