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
    ){}

    async updateUserQuizHistory(quiz_id: string, user_id: number, payload:UpdateQuizRecordDTO){
        const user = await this.userRepository.findOne({where:{id: user_id}})
        const quiz = await this.quizRepository.findOne({where: {quiz_id}})
        const userHistory = new QuizHistory()
        userHistory.quiz = quiz
        userHistory.user = user
        userHistory.numberOfCorrectAnswers =  payload.correct
        userHistory.numberOfWrongAnswers = payload.incorrect

        return await this.quizHistory.save(userHistory)
        
        
    }
}
