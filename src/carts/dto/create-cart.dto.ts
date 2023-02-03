import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Products } from './../../products/entities/product.entity';

export class CreateCartDto {
  @ApiProperty({ type: User })
  @IsNotEmpty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'user not exist',
  })
  user: User;

  @ApiProperty({ type: Products })
  @IsNotEmpty()
  @Validate(IsExist, ['Products', 'id'], {
    message: 'product not exist',
  })
  products: Products;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '1200' })
  @IsNotEmpty()
  total: number;
}
