import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLevelDTO {
  @IsString()
  @ApiProperty({ example: 'Bachelors in Software Engineering' })
  level: string;

  @IsString()
  @ApiProperty({
    example:
      'https://i.pcmag.com/imagery/roundups/02HDufdqeRUDu3tl0NnY2qZ-2..v1649351854.jpg',
  })
  level_img: string;
}
