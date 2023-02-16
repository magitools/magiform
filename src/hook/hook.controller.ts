import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HookService } from './hook.service';

@Controller('hook')
export class HookController {
  constructor(private hookService: HookService) {}
  @Get('/types')
  @UseGuards(JwtAuthGuard)
  getTypes() {
    return this.hookService.getTypes();
  }
}
