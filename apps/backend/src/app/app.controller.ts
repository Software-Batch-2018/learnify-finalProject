import { Controller, Get, Param, Req } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
