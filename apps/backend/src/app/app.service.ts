import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './api/courses/entities/content.entity';
import datasource from '../shared/database/migration.config';
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

  async searchInTable(searchTerm: string): Promise<any[]> {
    const searchResults = await datasource.query(
      `SELECT * FROM search_table WHERE vector @@ to_tsquery($1)`,
      [searchTerm]
    );
    const entityIds = searchResults.map((result) => result.entityId);
    if (entityIds.length === 0) {
      return [];
    }
    const entityIdString = entityIds.map((id) => `'${id}'`).join(', ');
    const result = await datasource.query(
      `
  SELECT
    subject_id as id,
    subject_img as image,
    subject_name as title
  FROM subjects
  WHERE subject_id IN (${entityIdString})
  UNION ALL
  SELECT
    blog_id,
    blog_img,
    title
  FROM blog
  WHERE blog_id IN (${entityIdString})
  UNION ALL
  SELECT
    id,
    question,
    description
  FROM forum
  WHERE id IN (${entityIdString})
  UNION ALL
  SELECT
    content_id,
    content_title,
    title_image
  FROM content
  WHERE content_id IN (${entityIdString})
  `
    );

    return result;
  }
}
