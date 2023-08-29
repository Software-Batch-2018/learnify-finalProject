import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddNewContentDTO, UpdateContentDTO } from './dto/content.dto';
import { CreateLevelDTO } from './dto/level.dto';
import { Content } from './entities/content.entity';
import { Level } from './entities/level.entity';
import { Subjects } from './entities/subject.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateSubjectDTO } from './dto/subject.dto';
import { OpenAiService } from '../../../shared/openai/openai.service';
import { QuizService } from '../quiz/quiz.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,

    @InjectRepository(Subjects)
    private subjectRepository: Repository<Subjects>,

    @InjectRepository(Content)
    private contentRepository: Repository<Content>,

    private quizService: QuizService,

    private readonly aiService: OpenAiService
  ) {}

  async createSubject(body: CreateSubjectDTO) {
    const level = await this.levelRepository.findOneOrFail({
      where: { level_id: body.level_id },
    });
    const subject = new Subjects();
    subject.subject_name = body.subject_name;
    subject.subject_img = body.subject_img;
    subject.level = level;
    return await this.subjectRepository.save(subject);
  }

  async createNewLevel(body: CreateLevelDTO) {
    const level = new Level();
    level.level = body.level;
    level.level_img = body.level_img;
    return await this.levelRepository.save(level);
  }

  async createContent(body: AddNewContentDTO) {
    const subject = await this.subjectRepository.findOneOrFail({
      where: { subject_id: body.subject_id },
    });
    const content = new Content();
    content.title_image = body.title_img;
    content.content_title = body.content_title;
    content.content = body.content;
    content.subject = subject;

    const data = await this.contentRepository.save(content);

    if (body.auto_quiz) {
      const quiz = await this.aiService.autoQuiz(body.content);
      console.log(quiz)
      const final = await this.quizService.createQuiz(quiz, data.content_id);
      console.log(final)
    }
    return data;
  }

  async listContentsofSubjects(
    options: IPaginationOptions,
    subject_id: string
  ): Promise<Pagination<Content>> {
    const queryBuilder = this.contentRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.created_at', 'DESC');
    queryBuilder.where('c.subject = :subject_id', { subject_id: subject_id });

    return paginate<Content>(queryBuilder, options);
  }

  async listAllLevels(options: IPaginationOptions): Promise<any> {
    // const queryBuilder = this.levelRepository.createQueryBuilder('l');
    // queryBuilder.leftJoinAndSelect('l.subjects', 's');
    // queryBuilder.leftJoinAndSelect('s.contents', 'c');



    // return {... paginate<Level>(queryBuilder, options)}

    return await this.levelRepository.createQueryBuilder('level')
    .leftJoinAndSelect('level.subjects', 'subjects')
    .loadRelationCountAndMap('level.subjectsCount', 'level.subjects')
    .getMany();
  }

  async listAllSubjects(
    options: IPaginationOptions,
    level_id: string
  ): Promise<any> {
    // const queryBuilder = this.subjectRepository.createQueryBuilder('c');
    // queryBuilder.where('c.level = :level_id', { level_id: level_id });

    // return paginate<Subjects>(queryBuilder, options);
    return await this.subjectRepository.createQueryBuilder('subjects')
    .leftJoinAndSelect('subjects.contents', 'contents')
    .loadRelationCountAndMap('subjects.contentsCount', 'subjects.contents')
    .where('subjects.level = :level_id', { level_id: level_id })
    .getMany();
  }

  async editContent(content_id: string, body: UpdateContentDTO) {
    await this.contentRepository.update(content_id, body);
    const updatedContent = await this.contentRepository.findOne({
      where: { content_id: content_id },
    });
    if (updatedContent) {
      return updatedContent;
    }
    throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
  }

  async deleteContent(content_id: string) {
    return await this.contentRepository.delete(content_id);
  }
}
