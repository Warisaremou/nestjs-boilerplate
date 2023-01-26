import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoriesRepository.create({
      ...createCategoryDto,
    });
    return this.categoriesRepository.save(createCategory);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = this.categoriesRepository.create({
      id,
      ...updateCategoryDto,
    });
    return this.categoriesRepository.save(updateCategory);
  }

  delete(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
