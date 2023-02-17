import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() req) {
    return this.statisticsService.getAll(req.user.id);
  }
}
