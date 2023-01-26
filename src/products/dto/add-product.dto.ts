import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  IsOptional,
} from 'class-validator';
import { ProductsFilesEntity } from './../../productsFiles/entities/productsFiles.entity';
import { ProductStatus } from '../../statuses/entities/productStatus.entity';
import { IsExist } from './../../utils/validators/is-exists.validator';
import { Categories } from './../../categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

export class AddProductDto {
  @ApiProperty({ example: 'T-Shirt' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'T-Shirt Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'T-Shirt Price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'T-Shirt Quantity' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 'T-Shirt Mark' })
  @IsString()
  mark: string;

  @ApiProperty({ type: User })
  @Validate(IsExist, ['User', 'id'], {
    message: 'user not exist',
  })
  seller?: User;

  @ApiProperty({ type: Categories })
  @IsNotEmpty()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'category not exist',
  })
  category?: Categories;

  @ApiProperty({ type: () => ProductsFilesEntity })
  @IsOptional()
  @Validate(IsExist, ['ProductsFilesEntity', 'id'], {
    message: 'picture not exists',
  })
  pictures: ProductsFilesEntity[];

  @ApiProperty({ type: ProductStatus })
  @Validate(IsExist, ['ProductStatus', 'id'], {
    message: 'status not exist',
  })
  status?: ProductStatus;
}
