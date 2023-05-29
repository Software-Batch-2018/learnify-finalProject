import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subjects } from './entities/subject.entity';
import { Content } from './entities/content.entity';
import { Level } from './entities/level.entity';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Subjects),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Content),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Level),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
