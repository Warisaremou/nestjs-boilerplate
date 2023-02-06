import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
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

  async findAll() {
    const categoriesTree = await getManager()
      .getTreeRepository(Categories)
      .findTrees();

    return categoriesTree;
  }

  async findOne(id: number) {
    // Check if category exist
    const existingCategory = await this.categoriesRepository.findOne(id);

    const categoryTree = await getManager()
      .getTreeRepository(Categories)
      .findDescendantsTree(existingCategory);

    return categoryTree;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = this.categoriesRepository.create({
      id,
      ...updateCategoryDto,
    });
    return this.categoriesRepository.save(updateCategory);
  }

  async softDelete(id: number) {
    await this.categoriesRepository.softDelete(id);
  }
}
