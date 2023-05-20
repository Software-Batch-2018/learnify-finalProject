import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    const blog = new Blog();
    blog.content = createBlogDto.content;
    blog.title = createBlogDto.title;
    blog.blog_img = createBlogDto.blog_img;
    return await this.blogRepository.save(blog);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Blog>> {
    return paginate<Blog>(this.blogRepository, { limit: 10, page: 1 });
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
