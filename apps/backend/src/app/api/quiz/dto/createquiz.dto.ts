import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

class AnswerDTO {
  @ApiProperty()
  @IsString()
  label: string;
}

class QuestionDTO {
  @ApiProperty()
  @IsString()
  questionTitle: string;

  @ApiProperty()
  @IsNumber()
  answerIndex: number;

  @ApiProperty({ type: AnswerDTO, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(4)
  @Type(() => AnswerDTO)
  answerOptions: AnswerDTO[];
}

export class CreateQuizDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: QuestionDTO, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(4)
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];
}
