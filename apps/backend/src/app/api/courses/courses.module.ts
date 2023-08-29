import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entities/subject.entity';
import { Content } from './entities/content.entity';
import { Level } from './entities/level.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { OpenAiService } from '../../../shared/openai/openai.service';
import { QuizService } from '../quiz/quiz.service';
import { Quiz } from '../quiz/entities/quiz.entity';
import { QaserviceService } from '../question-answer/qaservice.service';
import { QaEntity, QaQuestion } from '../question-answer/entities/qa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects, Content, Level, Quiz, QaEntity, QaQuestion])],
  controllers: [CoursesController],
  providers: [CoursesService, OpenAiService, QuizService, QaserviceService],
})
export class CoursesModule {}
