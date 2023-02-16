import { Prisma } from '.prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/register")
    async register(@Body() data: Prisma.UserCreateInput) {
        const token = await this.authService.register(data)
        return {access_token: token}
    }
    
    @Post("/login")
    async login(@Body() data: {email: string, password: string}) {
        const token = await this.authService.login(data.email, data.password)
        return {access_token: token}
    }
}
