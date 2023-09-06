import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @ApiProperty({ example: 'https://www.youtube.com/watch?v=R9PTBwOzceo' })
  material_link: string;
}

export class CreateQADto {
  @IsString()
  @ApiProperty()
  questionTitle: string;

  @IsString()
  @ApiProperty()
  answer: string;
}
