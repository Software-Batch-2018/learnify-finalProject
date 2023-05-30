import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizDTO } from './dto/createquiz.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
@ApiTags('Quiz Module')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Post(':course_id')
  async addQuiz(
    @Param('course_id') course_id: string,
    @Body() data: CreateQuizDTO
  ) {
    return this.quizService.createQuiz(data, course_id);
  }
}
