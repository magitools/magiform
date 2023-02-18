import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FormCreateDTO } from './form.create.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req) {
    return this.formService.getAll(req.user.id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() data: FormCreateDTO) {
    return this.formService.create(req.user.id, data);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req, @Param('id') id: string) {
    return this.formService.delete(req.user.id, parseInt(id));
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: Prisma.FormUpdateInput,
  ) {
    return this.formService.update(req.user.id, parseInt(formId), data);
  }

  @Post('/trigger/:id')
  async trigger(
    @Headers('origin') origin,
    @Param('id') id: string,
    @Body() data: Object,
    @Res() res,
  ) {
    const redirect = await this.formService.trigger(origin, parseInt(id), data);
    return res.redirect(redirect || `${origin}`);
  }
}
