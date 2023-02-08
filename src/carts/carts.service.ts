import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Carts } from './entities/carts.entity';
import { Products } from './../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
  ) {}

  // Function to update product quantity after adding to cart
  async updateProductQuantity(id: number, quantity: number) {
    const product: Products = await Products.findOne(id);
    const newQuantity = product.quantity - quantity;
    return await Products.update(id, { quantity: newQuantity });
  }

  async create(createCartDto: CreateCartDto) {
    const createCart = this.cartsRepository.create({
      ...createCartDto,
    });

    const productQuantity: Products = await Products.findOne(
      createCartDto.product.id,
    );

    if (createCartDto.quantity > productQuantity.quantity) {
      return 'Quantity is not available';
    }
    // Calling function to update product quantity after adding to cart
    await this.updateProductQuantity(
      productQuantity.id,
      createCartDto.quantity,
    );

    return this.cartsRepository.save(createCart);
  }

  findAll() {
    const cartRepository = getRepository(Carts);
    const carts = cartRepository.find({
      relations: ['product', 'user'],
    });
    return carts;
  }

  findOne(id: number) {
    const cartRepository = getRepository(Carts);
    const cart = cartRepository.findOne(id, {
      relations: ['product', 'user'],
    });
    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    const updateCart = this.cartsRepository.create({
      id,
      ...updateCartDto,
    });
    return this.cartsRepository.save(updateCart);
  }

  async softDelete(id: number) {
    await this.cartsRepository.softDelete(id);
  }
}
