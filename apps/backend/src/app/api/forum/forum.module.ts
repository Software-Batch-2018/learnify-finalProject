import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumReply } from './entities/replies.entity';
import { User } from '../users/entities/user.entity';
import { ReplyGateway } from './gateway/reply.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, ForumReply, User])],
  controllers: [ForumController],
  providers: [ForumService, ReplyGateway],
})
export class ForumModule {}
