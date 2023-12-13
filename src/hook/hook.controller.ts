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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HookService } from './hook.service';
import { hooks } from 'src/db';

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
  @ApiCreatedResponse({ type: typeof hooks.$inferSelect })
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: typeof hooks.$inferInsert,
  ) {
    return this.hookService.create(req.user.id, parseInt(formId), data);
  }

  @Delete('/:id')
  @ApiResponse({ type: typeof hooks.$inferSelect })
  @UseGuards(JwtAuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.hookService.delete(req.user.id, parseInt(id));
  }

  @Put('/:id')
  @ApiResponse({ type: typeof hooks.$inferSelect })
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Param('id') id: string, @Body() data: typeof hooks.$inferInsert) {
    return this.hookService.update(req.user.id, parseInt(id), data);
  }
}
