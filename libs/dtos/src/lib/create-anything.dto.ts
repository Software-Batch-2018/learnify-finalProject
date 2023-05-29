import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnything {
  @IsString()
  @ApiProperty()
  anythingString!: string;
}
