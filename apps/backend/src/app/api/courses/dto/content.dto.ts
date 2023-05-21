import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddNewContentDTO {
  @IsString()
  @ApiProperty({ example: 'Linked List' })
  content_title: string;

  @IsString()
  @ApiProperty({
    example:
      'https://res.cloudinary.com/dpessyoae/image/upload/v1494083335/linkedlist3_fsadk8.png',
  })
  title_img: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  subject_id: string;
}

export class UpdateContentDTO extends PartialType(AddNewContentDTO) {}
