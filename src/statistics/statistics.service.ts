import { Injectable, Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../db"
import { eq } from 'drizzle-orm';

@Injectable()
export class StatisticsService {
  constructor(@Inject("DB") private dbService: LibSQLDatabase<typeof schema>) {}

  async getAll(userId: number) {
    return this.dbService.query.statistics.findMany({
      with: {
        form: {
          where: (forms, {eq}) => eq(forms.user, userId)
        }
      }
    })
  }

  async create(data: typeof schema.statistics.$inferInsert) {
    return this.dbService.insert(schema.statistics).values(data)
  }
}
