import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatisticsEntity } from './statistic.entity';
import { StatisticsService } from './statistics.service';

@ApiTags('statistics')
@ApiBearerAuth()
@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('/')
  @ApiResponse({ type: StatisticsEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req) {
    return this.statisticsService.getAll(req.user.id);
  }
}
