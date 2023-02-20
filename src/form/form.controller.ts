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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FormCreateDTO } from './form.create.dto';
import { FormCreatedEntity, FormEntity, FormListEntity } from './form.entity';
import { FormService } from './form.service';

@ApiTags('form')
@ApiBearerAuth()
@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}

  @Get('/')
  @ApiResponse({ type: FormListEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req) {
    return this.formService.getAll(req.user.id);
  }

  @Post('/')
  @ApiCreatedResponse({ type: FormCreatedEntity })
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() data: FormCreateDTO) {
    return this.formService.create(req.user.id, data);
  }

  @Delete('/:id')
  @ApiResponse({ type: FormEntity })
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
  @ApiNoContentResponse()
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
