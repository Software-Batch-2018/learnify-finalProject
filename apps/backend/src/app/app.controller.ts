import { Controller, Get, Param, Req } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaService } from '../shared/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/top-courses')
  async getTopCourses(@Req() req) {
    return await this.appService.getTopCourses(req);
  }

  @Get('/search/:query')
  async searchCourses(@Param('query') query: string) {
    return await this.appService.search(query);
  }

  @Get('user-by-faculty')
  async getUsersByFaculty() {
    return await this.prismaService.level.findMany({
      select: {
        level: true,
        _count: {
          select: {
            user: true,
          },
        },
      },
    });
  }
}
