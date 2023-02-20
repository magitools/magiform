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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HookCreateInput } from './hook.create.dto';
import { HookEntity } from './hook.entity';
import { HookService } from './hook.service';
import { HookUpdateInput } from './hook.update.dto';

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
  @ApiCreatedResponse({ type: HookEntity })
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: HookCreateInput,
  ) {
    return this.hookService.create(req.user.id, parseInt(formId), data);
  }

  @Delete('/:id')
  @ApiResponse({ type: HookEntity })
  @UseGuards(JwtAuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.hookService.delete(req.user.id, parseInt(id));
  }

  @Put('/:id')
  @ApiResponse({ type: HookEntity })
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Param('id') id: string, @Body() data: HookUpdateInput) {
    return this.hookService.update(req.user.id, parseInt(id), data);
  }
}
