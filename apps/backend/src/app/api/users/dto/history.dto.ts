import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateQuizRecordDTO{
    @IsNumber()
    @ApiProperty()
    correct: number

    @IsNumber()
    @ApiProperty()
    incorrect: number
}