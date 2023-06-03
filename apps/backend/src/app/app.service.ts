import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './api/courses/entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getTopCourses() {
    return await this.contentRepository
      .createQueryBuilder('q')
      .orderBy('q.view', 'DESC')
      .take(10)
      .getMany();
  }
}
