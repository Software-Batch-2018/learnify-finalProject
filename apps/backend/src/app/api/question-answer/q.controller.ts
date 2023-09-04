import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QaserviceService } from './qaservice.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMaterialDto } from './dto/material.dto';

@Controller('material')
@ApiTags('Course Materials')
export class QController {
  constructor(private readonly qaService: QaserviceService) {}

  @Get(':course_id')
  @ApiOperation({
    summary: 'Get Course Material',
  })
  async getCourseMaterial(@Param('course_id') course_id: string) {
    return this.qaService.findCourseMaterial(course_id);
  }

  @Post(':course_id')
  async addCourseMaterial(
    @Param('course_id') course_id: string,
    @Body() body: CreateMaterialDto
  ) {
    return this.qaService.addCourseMaterial(course_id, body);
  }
}
