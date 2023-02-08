import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddReviewDto } from './dto/add-review.dto';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Reviews')
@Controller({
  path: 'review',
  version: '1',
})
export class ReviewsController {
  constructor(private rewiewsServices: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() addRewiew: AddReviewDto, @Req() req) {
    addRewiew.user = req.user.id;
    return this.rewiewsServices.create(addRewiew);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.rewiewsServices.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.rewiewsServices.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.rewiewsServices.softDelete(id);
  }
}
