import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { AddReviewDto } from './dto/add-review.dto';
import { ProductsReviews } from './entities/reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ProductsReviews)
    private reviewsRepository: Repository<ProductsReviews>,
  ) {}

  create(addReview: AddReviewDto) {
    const createReview = this.reviewsRepository.create({
      ...addReview,
    });

    return this.reviewsRepository.save(createReview);
  }

  async findAll() {
    const rewiewRepository = getRepository(ProductsReviews);
    const reviews = await rewiewRepository.find({
      relations: ['product', 'user'],
    });
    return reviews;
  }

  async softDelete(id: number) {
    return this.reviewsRepository.softDelete(id);
  }
}
