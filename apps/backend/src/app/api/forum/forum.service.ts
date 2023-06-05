import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { ForumReply } from './entities/replies.entity';
import { AskQuestionDTO } from './dto/ask.dto';
import { User } from '../users/entities/user.entity';
import { ReplyDTO } from './dto/reply.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,

    @InjectRepository(ForumReply)
    private forumReplyRepository: Repository<ForumReply>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async askQuestion(payload: AskQuestionDTO, user_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const forum = new Forum();
    forum.question = payload.question;
    forum.description = payload.description;
    forum.asked_by = user;
    return await this.forumRepository.save(forum);
  }
  async reply(payload: ReplyDTO, user_id: number, question_id: string) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const question = await this.forumRepository.findOne({
      where: { id: question_id },
    });

    const forum = new ForumReply();
    forum.comment = payload.comment;
    forum.replied_by = user;
    forum.question = question;
    return await this.forumReplyRepository.save(forum);
  }

  async getAllForumQuestions(options: IPaginationOptions) {
    const query = this.forumRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.asked_by', 'user')
      .orderBy("q.created_at", "DESC")


    return paginate<Forum>(query, options);
  }

  async getForumQuestionReplies(forum_id: string) {
    return this.forumRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.asked_by', 'asker')
      .leftJoinAndSelect('q.replies', 'replies')
      .leftJoinAndSelect('replies.replied_by', 'replier')
      .orderBy("replies.created_at", "DESC")
      .where('q.id = :forum_id', { forum_id })
      .getOne();
  }
}
