import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Blog } from './entities/blog.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Roles, User } from '../users/entities/user.entity';
import { CreateBlogDto, UpdateBlogDto } from '@learnify/dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    const admin = await this.userRepository.findOne({
      where: { role: Roles.ADMIN },
    });
    const blog = new Blog();
    blog.content = createBlogDto.content;
    blog.title = createBlogDto.title;
    blog.blog_img = createBlogDto.blog_img;
    blog.author = admin;
    return await this.blogRepository.save(blog);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Blog>> {
    const query = this.blogRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.author', 'u');
    return paginate<Blog>(query, { limit: 10, page: 1 });
  }

  async findOne(id: string) {
    return this.blogRepository.findOne({ where: { blog_id: id } });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.blogRepository.update(id, updateBlogDto);
    const updatedBlog = await this.blogRepository.findOne({
      where: { blog_id: id },
    });
    if (updatedBlog) {
      return updatedBlog;
    }

    throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const deleteBlog = await this.blogRepository.delete(id);
    if (!deleteBlog.affected) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    return 'Success';
  }
}
