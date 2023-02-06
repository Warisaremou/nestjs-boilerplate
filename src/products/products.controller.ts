import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private productsServices: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() addProduct: AddProductDto) {
    return this.productsServices.create(addProduct);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.productsServices.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.productsServices.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsServices.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsServices.softDelete(id);
  }
}
