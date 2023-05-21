import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AddNewContentDTO, UpdateContentDTO } from './dto/content.dto';
import { CreateLevelDTO } from './dto/level.dto';
import { CreateSubjectDTO } from './dto/subject.dto';
import { Content } from './entities/content.entity';
import { Subjects } from './entities/subject.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Level } from './entities/level.entity';

@Controller('courses')
@ApiTags('Curriculum Related Routes')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/level')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Create New Level of fields, example Bachelors in Software Engineering, Class 12 etc.',
  })
  async createNewLevel(@Body() body: CreateLevelDTO) {
    return await this.coursesService.createNewLevel(body);
  }

  @Post('/subject')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create New Subject, takes in a Subject Name' })
  async create(@Body() body: CreateSubjectDTO): Promise<Subjects> {
    return await this.coursesService.createSubject(body);
  }

  @Post('/content')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Add New Content for given subject. Need to pass Subject ID of respective subject name.',
  })
  async createContent(@Body() body: AddNewContentDTO): Promise<Content> {
    return await this.coursesService.createContent(body);
  }

  @Get('/all/levels')
  @ApiOperation({ summary: 'Get All levels of fields in paginated order' })
  async listAllLevel(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<Pagination<Level>> {
    return await this.coursesService.listAllLevels({ page, limit });
  }

  @Get('/all/subjects/:level_id')
  @ApiOperation({
    summary: 'List all subjects of given level in paginated order.',
  })
  async listAllSubjects(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param('level_id') level_id: string
  ): Promise<Pagination<Subjects>> {
    return await this.coursesService.listAllSubjects({ page, limit }, level_id);
  }

  @Get('/all/content/:subject_id')
  @ApiOperation({
    summary: 'Get All Contents for a given subject in paginated order',
  })
  async listContentsofSubjects(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param('subject_id') subject_id: string
  ): Promise<Pagination<Content>> {
    return await this.coursesService.listContentsofSubjects(
      { page, limit },
      subject_id
    );
  }

  @Patch('/edit/content/:content_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit Content of a given subject' })
  async editContent(
    @Body() body: UpdateContentDTO,
    @Param('content_id') content_id: string
  ) {
    return await this.coursesService.editContent(content_id, body);
  }

  @Delete('/delete/content/:content_id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Content by ID' })
  async deleteContent(@Param('content_id') content_id: string) {
    return await this.coursesService.deleteContent(content_id);
  }
}
