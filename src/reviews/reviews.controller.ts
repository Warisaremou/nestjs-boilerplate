import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddReviewDto } from './dto/add-review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller({
  path: 'review',
  version: '1',
})
export class ReviewsController {
  constructor(private rewiewsServices: ReviewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() addRewiew: AddReviewDto) {
    return this.rewiewsServices.create(addRewiew);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.rewiewsServices.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rewiewsServices.softDelete(id);
  }
}
