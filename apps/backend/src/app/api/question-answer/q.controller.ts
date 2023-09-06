import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QaserviceService } from './qaservice.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMaterialDto } from './dto/material.dto';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateQADto } from './dto/qa.dto';

@Controller('material')
@ApiTags('Course Materials')
export class QController {
  constructor(
    private readonly qaService: QaserviceService,
    private readonly prismaService: PrismaService
  ) {}
  @Get('all/:course_id')
  async getAllMaterial(@Param('course_id') course_id: string) {
    return this.prismaService.content.findMany({
      where: {
        content_id: course_id,
      },
      select: {
        qa_entity: {
          select: {
            qa_question: true,
          },
        },
        material: true,
      },
    });
  }
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

  @Post('qa/:course_id')
  async addQA(
    @Param('course_id') course_id: string,
    @Body() body: CreateQADto
  ) {
    return this.qaService.createQAfromFrontend(body, course_id);
  }
}
