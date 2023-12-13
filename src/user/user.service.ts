import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from "../db"
import { eq } from 'drizzle-orm';



@Injectable()
export class UserService {
    constructor(@Inject("DB") private dbService: LibSQLDatabase<typeof schema>) {}

    async getById(id: number) {
        return this.dbService.query.users.findFirst({where: eq(schema.users.id, id)})
    }
    async getByEmail(email: string) {
        return this.dbService.query.users.findFirst({where: eq(schema.users.email, email)})
    }
    async getByUsername(username: string) {
        return this.dbService.query.users.findFirst({where: eq(schema.users.username, username)})
    }
    async create(data: typeof schema.users.$inferInsert) {
        return this.dbService.insert(schema.users).values(data)
    }
}
