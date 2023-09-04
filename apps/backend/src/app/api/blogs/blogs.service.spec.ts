import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BlogService', () => {
  let blogService: BlogsService;
  let blogRepository: Repository<Blog>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getRepositoryToken(Blog),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    blogService = module.get<BlogsService>(BlogsService);
    blogRepository = module.get<Repository<Blog>>(getRepositoryToken(Blog));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(() => {
      return null;
    }),
    update: jest.fn(),
    delete: jest.fn(),
  };

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });
});
