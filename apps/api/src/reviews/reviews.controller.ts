import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() data: Prisma.ReviewCreateInput) {
    return this.reviewsService.create(data);
  }

  @Get()
  findAll(
    @Body('skip') skip: number,
    @Body('take') take: number,
    @Body('cursor') cursor: Prisma.ReviewWhereUniqueInput,
    @Body('where') where: Prisma.ReviewWhereInput,
    @Body('orderBy') orderBy: Prisma.ReviewOrderByWithRelationInput,
  ) {
    return this.reviewsService.findAll({ skip, take, cursor, where, orderBy });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne({ id });
  }

  @Patch(':id')
  update(@Body() data: Prisma.ReviewUpdateInput, @Param('id') id: string) {
    return this.reviewsService.update(data, { id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove({ id });
  }
}
