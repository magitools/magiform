import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HookService } from './hook.service';

@ApiTags('hook')
@ApiBearerAuth()
@Controller('hook')
export class HookController {
  constructor(private hookService: HookService) {}
  @Get('/types')
  @UseGuards(JwtAuthGuard)
  getTypes() {
    return this.hookService.getTypes();
  }

  @Post('/create/:id')
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: Prisma.HookCreateInput,
  ) {
    return this.hookService.create(req.user.id, parseInt(formId), data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.hookService.delete(req.user.id, parseInt(id));
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() data: Prisma.HookUpdateInput,
  ) {
    return this.hookService.update(req.user.id, parseInt(id), data);
  }
}
