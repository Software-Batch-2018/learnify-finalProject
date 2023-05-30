import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from '../courses/entities/content.entity';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Answer, Content])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
