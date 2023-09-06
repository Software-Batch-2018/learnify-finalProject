import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'sad@gmail.com' })
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'string123' })
  public readonly password: string;

  @IsString()
  @ApiProperty({ example: 'sad' })
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @ApiProperty()
  public readonly user_level: string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'sad@gmail.com' })
  public readonly email: string;

  @IsString()
  @ApiProperty({ example: 'string123' })
  public readonly password: string;
}
