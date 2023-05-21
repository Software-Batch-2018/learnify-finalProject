import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubjectDTO {
  @IsString()
  @ApiProperty({ example: 'Data Structures and Algorithms' })
  subject_name: string;

  @IsString()
  @ApiProperty({
    example: 'https://miro.medium.com/max/1400/1*sMryEXZVPKFjGNcfSzE8Mw.jpeg',
  })
  subject_img!: string;

  @IsString()
  @ApiProperty()
  level_id: string;
}
