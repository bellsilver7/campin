import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Review } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  findAll(params: {
    skip: number;
    take: number;
    cursor: Prisma.ReviewWhereUniqueInput;
    where: Prisma.ReviewWhereInput;
    orderBy: Prisma.ReviewOrderByWithRelationInput;
  }): Promise<Review[]> {
    return this.prisma.review.findMany(params);
  }

  findOne(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.findUnique({ where });
  }

  update(
    where: Prisma.ReviewWhereUniqueInput,
    data: Prisma.ReviewUpdateInput,
  ): Promise<Review> {
    return this.prisma.review.update({ where, data });
  }

  remove(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.delete({ where });
  }
}
