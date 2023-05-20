import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../users/auth/auth.guard';
import { CreateLevelDTO } from './dto/create-level.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Level } from './entities/level.entity';

@Controller('level')
@ApiTags('Level Related Routes')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @Post('')
  @ApiBearerAuth()
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'Create New Level of fields, example Bachelors in Software Engineering, Class 12 etc.',
  })
  async createNewLevel(@Body() body: CreateLevelDTO) {
    return await this.levelService.createNewLevel(body);
  }
  @Get('/all')
  @ApiOperation({ summary: 'Get All levels of fields in paginated order' })
  async listAllLevel(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<Pagination<Level>> {
    return await this.levelService.listAllLevels({ page, limit });
  }
}
