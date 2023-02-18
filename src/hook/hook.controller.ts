import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
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

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.hookService.delete(req.user.id, parseInt(id));
  }
}
