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
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('blogs')
@ApiTags('Blog Related Routes')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create New Blog' })
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all blogs.' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit = 100
  ): Promise<Pagination<Blog>> {
    limit = limit > 100 ? 100 : limit;
    return await this.blogsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return blog by id.' })
  async findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit Blog by id. Can only be accessed by Admin Token.',
  })
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog by id.' })
  async remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
