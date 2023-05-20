import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
