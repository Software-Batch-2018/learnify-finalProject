import { Module } from '@nestjs/common';
import { QaserviceService } from './qaservice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QaEntity, QaQuestion } from './entities/qa.entity';
import { QController } from './q.controller';
import { Content } from '../courses/entities/content.entity';
import { Material } from './entities/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QaEntity, QaQuestion, Content, Material]),
  ],
  controllers: [QController],
  providers: [QaserviceService],
})
export class QuestionAnswerModule {}
