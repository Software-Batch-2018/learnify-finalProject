import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openAi: OpenAI;

  constructor(private readonly config: ConfigService) {
    console.log(this.config.get('OPEN_AI_KEY'));
    this.openAi = new OpenAI({
      apiKey: this.config.get<string>('OPEN_AI_KEY'),
    });
  }

  async autoQuiz(content: string) {
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `
      from this content generate me a quiz in this format, answer index must be random but the random index must have correct answer and at least 5 to 6 quiz questions and only four answer option, no other text straight in this format
      {
        "title": "string",
        "questions": [
          {
            "questionTitle": "string",
            "answerIndex": 0,
            "answerOptions": [
              {
                "label": "string"
              }
            ]
          }
        ]
      }
      the content is this
      ${content}
    `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    try {
      return JSON.parse(completion.choices[0].message.content);
    } catch (e: any) {
      throw new Error('Error generating quiz');
    }
  }

  async autoQA(content: string) {
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `
          from this content generate me a question answer in this format in json, at least 10  questions answer, no other text straight in this format
          class CreateQuestionDto {
            @IsString()
            @IsNotEmpty()
            questionTitle: string;
          
            @IsString()
            @IsNotEmpty()
            answer: string;
          }
          
          export class CreateQADto {
            @ValidateNested({ each: true })
            @Type(() => CreateQuestionDto)
            @ArrayNotEmpty()
            questions: CreateQuestionDto[];
          }
                the content is this
      ${content}
    `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    try {
      return JSON.parse(completion.choices[0].message.content);
    } catch (e: any) {
      throw new Error('Error generating quiz');
    }
  }

  async askAi(question: string) {
    const completion = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `This is question asked by my student, give them relevenat answer
          ${question}
          `,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  }
}
