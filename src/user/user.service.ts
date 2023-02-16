import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}


    async getById(id: number) {
        return this.prismaService.user.findUnique({where:{id}})
    }
    async getByEmail(email: string) {
        return this.prismaService.user.findUnique({where:{email}})
    }
    async getByUsername(username: string) {
        return this.prismaService.user.findUnique({where: {username}})
    }
    async create(data: Prisma.UserCreateInput) {
        return this.prismaService.user.create({data})
    }
}
