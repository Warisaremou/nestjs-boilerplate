import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Categories } from '../entities/category.entity';
import { Products } from 'src/products/entities/product.entity';

export class CreateProductToCategoryDto {
  @ApiProperty({ example: 'Product Id' })
  @Validate(IsExist, ['Products', 'id'], {
    message: 'product not exist',
  })
  productId: Products;

  @ApiProperty({ type: Categories })
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'category not exist',
  })
  categoryId: Categories[];
}

/*

import { ApiProperty } from '@nestjs/swagger';@ApiProperty({ type: Products })
  @Validate(IsExist, ['Products', 'id'], {
    message: 'product not exist',
  })
  productId: Products;

  @ApiProperty({ type: Categories })
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'category not exist',
  })
  categoryId: Categories[];

*/
