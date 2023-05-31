import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from '../courses/entities/content.entity';
import { CreateQuizDTO } from './dto/createquiz.dto';
import { Quiz } from './entities/quiz.entity';
import * as _ from 'lodash';
@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,

    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}
  async createQuiz(body: CreateQuizDTO, course_id: string) {
    const course = await this.contentRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.quiz', 'quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.answerOptions', 'answer')
      .where('u.content_id = :id', { id: course_id })
      .getOne();

    if (course.quiz) {
      const mergedQuestions = course.quiz.questions.map((question, index) => {
        const mergedQuestion = { ...question, ...body.questions[index] };
        return {
          ...question,
          ...mergedQuestion,
          answerOptions: question.answerOptions.map((answer, answerIndex) => ({
            ...answer,
            ...mergedQuestion.answerOptions[answerIndex],
          })),
        };
      });

      const quiz = {
        ...course.quiz,
        ...body,
        questions: mergedQuestions,
      };
      course.quiz = quiz;
      await this.quizRepository.save(course.quiz);
      return {
        message: 'Successfully Updated Quiz',
      };
    } else {
      // Create new quiz
      const quiz = this.quizRepository.create(body);
      const res = await this.quizRepository.save(quiz);
      course.quiz = res;
      await this.contentRepository.save(course);
    }

    return {
      message: 'Successfully Added Quiz',
    };
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
