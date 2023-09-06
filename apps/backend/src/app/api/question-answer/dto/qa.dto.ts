import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  questionTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  answer: string;
}

export class CreateQADto {
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @ArrayNotEmpty()
  @ApiProperty({ type: CreateQuestionDto, isArray: true })
  questions: CreateQuestionDto[];
}
