import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../shared/typeorm/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './api/blogs/blogs.module';
import { UsersModule } from './api/users/users.module';
import { CoursesModule } from './api/courses/courses.module';
import { QuizModule } from './api/quiz/quiz.module';
import { Content } from './api/courses/entities/content.entity';
import { ForumModule } from './api/forum/forum.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Content]),
    BlogsModule,
    UsersModule,
    CoursesModule,
    QuizModule,
    ForumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
