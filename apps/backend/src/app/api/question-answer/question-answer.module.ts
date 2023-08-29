import { Module } from '@nestjs/common';
import { QaserviceService } from './qaservice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QaEntity, QaQuestion } from './entities/qa.entity';
import { QController } from './q.controller';
import { Content } from '../courses/entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QaEntity, QaQuestion, Content])
  ],
  controllers:[QController],
  providers: [QaserviceService],
})
export class QuestionAnswerModule {}
