import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FormCreateDTO } from './form.create.dto';
import { FormService } from './form.service';

@ApiTags('form')
@ApiBearerAuth()
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
