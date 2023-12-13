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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FormService } from './form.service';
import { getFileInterceptor } from './form.interceptor';
import { forms } from 'src/db';

@ApiTags('form')
@ApiBearerAuth()
@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}

  @Get('/')
  @ApiResponse({ type: typeof forms.$inferSelect, isArray: true })
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req) {
    return this.formService.getAll(req.user.id);
  }

/*   @Post('/')
  @ApiCreatedResponse({ type: typeof forms.$inferSelect, })
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() data: typeof forms.$inferInsert,) {
    return this.formService.create(req.user.id, data);
  }

  @Delete('/:id')
  @ApiResponse({ type: typeof forms.$inferSelect, })
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req, @Param('id') id: string) {
    return this.formService.delete(req.user.id, parseInt(id));
  }

  @Put('/:id')
  @ApiResponse({ type: typeof forms.$inferSelect, })
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req,
    @Param('id') formId: string,
    @Body() data: typeof forms.$inferInsert,
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
    const redirect = await this.formService.trigger(origin, parseInt(id), data, files);
    return res.redirect(redirect || `${origin}`);
  } */
}
