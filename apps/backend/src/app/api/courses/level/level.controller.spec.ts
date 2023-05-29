import { Test, TestingModule } from '@nestjs/testing';
import { LevelController } from './level.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { LevelService } from './level.service';

describe('LevelController', () => {
  let controller: LevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LevelController],
      providers: [
        LevelService,
        {
          provide: getRepositoryToken(Level),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LevelController>(LevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
