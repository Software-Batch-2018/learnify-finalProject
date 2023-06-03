import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { JwtAuthGuard } from '../users/auth/auth.guard';
import { AskQuestionDTO } from './dto/ask.dto';
import { ReplyDTO } from './dto/reply.dto';
import { ReplyGateway } from './gateway/reply.gateway';
import { ApiTags } from '@nestjs/swagger';

@Controller('forum')
@ApiTags('Forum Related routes')
export class ForumController {
  constructor(
    private readonly forumService: ForumService,
    private readonly replyGateway: ReplyGateway
  ) {}

  @Get()
  async getAllForumQuestion(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ) {
    return this.forumService.getAllForumQuestions({ page, limit });
  }

  @Get(':forum_id')
  async getForumQuestionReplies(@Param('forum_id') forum_id: string) {
    return this.forumService.getForumQuestionReplies(forum_id);
  }

  @Post('ask')
  @UseGuards(JwtAuthGuard)
  async askQuestion(@Body() payload: AskQuestionDTO, @Request() req) {
    return this.forumService.askQuestion(payload, req.user.id);
  }

  @Post('reply/:question_id')
  @UseGuards(JwtAuthGuard)
  async replyQuestion(
    @Body() payload: ReplyDTO,
    @Request() req,
    @Param('question_id') question_id: string
  ) {
    const data = await this.forumService.reply(
      payload,
      req.user.id,
      question_id
    );
    this.replyGateway.server.emit(question_id, data);
    return data;
  }
}
