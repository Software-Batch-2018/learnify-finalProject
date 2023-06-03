import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AskQuestionDTO {
  @IsString()
  @ApiProperty()
  question: string;

  @IsString()
  @ApiProperty()
  description: string;
}
