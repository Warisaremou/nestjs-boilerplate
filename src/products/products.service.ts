import { Injectable } from '@nestjs/common';
import { Products } from './entities/product.entity';
import { Repository, getRepository } from 'typeorm';
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
    const createProduct = this.productsRepository.create(addProductDto);

    return this.productsRepository.save(createProduct);
  }

  async findAll() {
    const productRepository = getRepository(Products);
    const products = await productRepository.find({
      relations: ['pictures', 'seller', 'status', 'reviews'],
    });
    return products;
  }

  async findOne(id: number) {
    const productRepository = getRepository(Products);
    const product = await productRepository.findOne(id, {
      relations: ['pictures', 'seller', 'status', 'reviews'],
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = this.productsRepository.create({
      id,
      ...updateProductDto,
    });

    return this.productsRepository.save(updateProduct);
  }

  async softDelete(id: number) {
    await this.productsRepository.softDelete(id);
  }
}
