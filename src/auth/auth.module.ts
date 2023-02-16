import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_TOKEN
  })]
})
export class AuthModule {}
