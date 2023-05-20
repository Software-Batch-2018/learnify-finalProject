import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { CreateLevelDTO } from './dto/create-level.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>
  ) {}

  async createNewLevel(body: CreateLevelDTO) {
    const level = new Level();
    level.level = body.level;
    level.level_img = body.level_img;
    return await this.levelRepository.save(level);
  }
  async listAllLevels(options: IPaginationOptions): Promise<Pagination<Level>> {
    const queryBuilder = this.levelRepository.createQueryBuilder('l');
    // queryBuilder.leftJoinAndSelect('l.subjects', 's');
    // queryBuilder.leftJoinAndSelect('s.contents', 'c');

    return paginate<Level>(queryBuilder, options);
  }
}
