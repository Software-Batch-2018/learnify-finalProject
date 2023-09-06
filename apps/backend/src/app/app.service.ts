import { Injectable } from '@nestjs/common';

import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getTopCourses(req: any) {
    console.log(req.headers.authorization);
    return await this.prismaService.content.findMany({
      select: {
        content_title: true,
        content_id: true,
        title_image: true,
        subjects: {
          select: {
            subject_name: true,
          },
        },
      },
      take: 10,
      orderBy: {
        view: 'desc',
      },
    });
  }

  async search(query: string) {
    return this.prismaService.content.findMany({
      where: {
        OR: [
          {
            content_title: {
              contains: query,
            },
          },
          { content: { contains: query } },
        ],
      },
      select: {
        content_title: true,
        title_image: true,
        content_id: true,
        subjects: {
          select: {
            subject_name: true,
          },
        },
      },
    });
  }
}
