import { Injectable } from '@nestjs/common';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  create(addProductDto: AddProductDto) {
    const createProduct = this.productsRepository.create({
      ...addProductDto,
    });

    return this.productsRepository.save(createProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = this.productsRepository.create({
      id,
      ...updateProductDto,
    });

    return this.productsRepository.save(updateProduct);
  }

  delete(id: number) {
    return this.productsRepository.delete(id);
  }
}
