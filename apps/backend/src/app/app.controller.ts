import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Content } from './api/courses/entities/content.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/top-courses')
  async getTopCourses(): Promise<Content[]>{
    return await this.appService.getTopCourses()
  }
}
