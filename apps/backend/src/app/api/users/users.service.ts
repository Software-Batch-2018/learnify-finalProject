import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { QuizHistory } from './entities/quizHistory.entity';
import { UpdateQuizRecordDTO } from './dto/history.dto';
import { Quiz } from '../quiz/entities/quiz.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(QuizHistory)
    private quizHistory: Repository<QuizHistory>,

    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>
  ) {}

  async updateUserQuizHistory(
    quiz_id: string,
    user_id: number,
    payload: UpdateQuizRecordDTO
  ) {
    const quizExists = await this.quizHistory
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.quiz', 'quiz')
      .leftJoinAndSelect('q.user', 'user')
      .where('user.id = :user_id', { user_id })
      .andWhere('quiz.quiz_id = :quiz_id', { quiz_id })
      .getOne();

    if (quizExists) {
      quizExists.numberOfCorrectAnswers = payload.correct;
      quizExists.numberOfWrongAnswers = payload.incorrect;

      return await this.quizHistory.save(quizExists);
    }
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const quiz = await this.quizRepository.findOne({ where: { quiz_id } });
    const userHistory = new QuizHistory();
    userHistory.quiz = quiz;
    userHistory.user = user;
    userHistory.numberOfCorrectAnswers = payload.correct;
    userHistory.numberOfWrongAnswers = payload.incorrect;

    return await this.quizHistory.save(userHistory);
  }

  async getUserQuizRecord(user_id: number) {
    const quizzes = await this.userRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.quizHistories', 'his')
      .leftJoinAndSelect('his.quiz', 'quiz')
      .where('q.id = :user_id', { user_id })
      .getMany();

    let corrects = 0;
    let incorrects = 0;
    let total = 0;

    quizzes.map((quiz) => {
      total = quiz.quizHistories.length;
      quiz.quizHistories.map((his) => {
        corrects += his.numberOfCorrectAnswers;
        incorrects += his.numberOfWrongAnswers;
      });
    });

    return {
      quizHistory: quizzes[0].quizHistories,
      total,
      corrects,
      incorrects,
    };
  }
}
