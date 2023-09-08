import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBlogDto {
  @IsString()
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  blog_img!: string;

  @IsString()
  @ApiProperty()
  content!: string;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
