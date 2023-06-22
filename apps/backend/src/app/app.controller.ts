import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { Content } from './api/courses/entities/content.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("search/:query")
  async search(
    @Param("query") query: string
  ){
    return this.appService.searchInTable(query)
  }

  @Get()
  getData() {
    return this.appService.getData();
  }



  @Get('/top-courses')
  async getTopCourses(): Promise<Content[]>{
    return await this.appService.getTopCourses()
  }
}
