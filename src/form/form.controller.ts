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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { FormUpdateInput } from './form.update.dto';
import { FormCreatedEntity, FormEntity, FormListEntity } from './form.entity';
import { FormService } from './form.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { getFileInterceptor } from './form.interceptor';

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
  @ApiResponse({ type: FormEntity })
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: FormUpdateInput,
  ) {
    return this.formService.update(req.user.id, parseInt(formId), data);
  }

  @Post('/trigger/:id')
  @UseInterceptors(AnyFilesInterceptor(getFileInterceptor()))
  @ApiNoContentResponse()
  async trigger(
    @Headers('origin') origin,
    @Param('id') id: string,
    @Body() data: Object,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Res() res,
  ) {
    console.log(id)
    console.log(data)
    if (!id) return res.redirect(origin);
    const redirect = await this.formService.trigger(origin, parseInt(id), data, files);
    return res.redirect(redirect || `${origin}`);
  }
}
