import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../db"
import { eq } from 'drizzle-orm';
import { FormService } from 'src/form/form.service';

@Injectable()
export class HookService {
  constructor(
    @Inject("DB") private dbService: LibSQLDatabase<typeof schema>,
    @Inject('HOOK_INTEGRATIONS')
    private hookIntegrations,
    private formService: FormService
  ) {}

  private async verifyForm(userId: number, hookId: number) {
    const form = await this.dbService.query.hooks.findFirst({
      where: eq(schema.hooks.id, hookId),
      with: {
        form: {
          where: (forms, {eq}) => eq(forms.user, userId)
        }
      }
    })
    if (!form) {
      throw UnauthorizedException;
    }
    return form;
  }

  async getTypes() {
    console.log(this.hookIntegrations);
    return this.hookIntegrations;
  }

  async create(userId: number, formId: number, data: typeof schema.hooks.$inferInsert) {
    const form = await this.formService.get(userId, formId);
    if (!form) {
      throw UnauthorizedException;
    }
    return this.dbService.insert(schema.hooks).values(data)
  }

  async delete(userId: number, hookId: number) {
    await this.verifyForm(userId, hookId);
    return this.dbService.delete(schema.hooks).where(eq(schema.hooks.id, hookId));
  }

  async update(userId: number, hookId: number, data: typeof schema.hooks.$inferInsert) {
    await this.verifyForm(userId, hookId);
    return this.dbService.update(schema.hooks).set(data).where(eq(schema.hooks.id, hookId))
  }
}
