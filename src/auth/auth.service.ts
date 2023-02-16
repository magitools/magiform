import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {compare, hash} from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '.prisma/client';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email)
        if (!user) {
            throw UnauthorizedException
        }
        const match = await compare(password, user.password)
        if (!match) {
            throw UnauthorizedException
        }
        const { password: ignore, ...result } = user;
        return result
    }
    async login(email: string, password: string) {
        try {
            const payload = await this.validateUser(email, password)
            return this.jwtService.sign(payload)
        } catch (e) {
            throw UnauthorizedException
        }
    }
    async register(data: Prisma.UserCreateInput) {
        const user = await this.userService.create({...data, password: await hash(data.password, 12)});
        const { password: ignore, ...result } = user;
        return this.jwtService.sign(result)
    }
}
