import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QaEntity, QaQuestion } from './entities/qa.entity';
import { Repository } from 'typeorm';
import { CreateQADto } from './dto/qa.dto';
import { Content } from '../courses/entities/content.entity';

@Injectable()
export class QaserviceService {
    constructor(
        @InjectRepository(QaEntity)
        private qaRepository: Repository<QaEntity>,

        @InjectRepository(QaQuestion)
        private questionRepository: Repository<QaQuestion>,

        @InjectRepository(Content)
        private contentRepository: Repository<Content>
    ){}

    async createQA(createQADto:CreateQADto, content_id: string) {
        const content = await this.contentRepository.findOne({ where: { content_id } });
      
        if (!content) {
          throw new Error(`Content with ID ${content_id} not found`);
        }
      
        const qa = new QaEntity();
        const questions = await Promise.all(
          createQADto.questions.map(async (questionData) => {
            const question = new QaQuestion();
            question.questionTitle = questionData.questionTitle;
            question.answer = questionData.answer;
            question.qa = qa; // Set the QAEntity instance here
            return question;
          }),
        );
      
        qa.questions = questions;
      
        const finalqa =  await this.qaRepository.save(qa);

        content.qa = finalqa
        await this.contentRepository.save(content)

        return finalqa
      }

}
