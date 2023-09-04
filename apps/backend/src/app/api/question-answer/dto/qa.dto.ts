import { IsString, IsNotEmpty, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

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