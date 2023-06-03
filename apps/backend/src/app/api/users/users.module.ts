import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { QuizHistory } from './entities/quizHistory.entity';
import { Quiz } from '../quiz/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, QuizHistory, Quiz]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
