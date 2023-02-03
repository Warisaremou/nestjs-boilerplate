import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsReviews } from './entities/reviews.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsReviews])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
