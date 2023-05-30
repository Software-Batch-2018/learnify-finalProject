import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../courses/entities/content.entity';
import { CreateQuizDTO } from './dto/createquiz.dto';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,

    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}
  async createQuiz(body: CreateQuizDTO, course_id: string) {
    const data = this.quizRepository.create(body);
    const res = await this.quizRepository.save(data);
    const course = await this.contentRepository.findOne({
      where: { content_id: course_id },
    });
    course.quiz = res;
    await this.contentRepository.save(course);
    return 'Successfully Added Quiz';
  }

  async findQuiz(course_id: string) {
    const data = await this.contentRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.quiz', 'quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answerOptions', 'answer')
      .where('u.content_id = :id', { id: course_id })
      .getOne();

    return data;
  }
}
