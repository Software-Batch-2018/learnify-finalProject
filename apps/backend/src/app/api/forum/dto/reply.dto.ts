import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReplyDTO {
  @IsString()
  @ApiProperty()
  comment: string;
}
