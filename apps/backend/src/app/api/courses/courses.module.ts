import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entities/subject.entity';
import { Content } from './entities/content.entity';
import { Level } from './entities/level.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects, Content, Level])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
