import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateQuizRecordDTO } from './dto/history.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User Related Routes')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('update-quiz-record/:quiz_id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateQuizRecord(
    @Request() req,
    @Param('quiz_id') quiz_id: string,
    @Body() payload: UpdateQuizRecordDTO
  ) {
    return this.userService.updateUserQuizHistory(
      quiz_id,
      req.user.id,
      payload
    );
  }

  @Get('quiz-record')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserQuizRecord(@Request() req) {
    return this.userService.getUserQuizRecord(req.user.id);
  }
}
