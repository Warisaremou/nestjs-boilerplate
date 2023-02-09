import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
// import { User } from 'src/users/entities/user.entity';
import { Products } from './../../products/entities/product.entity';
import { IsExist } from './../../utils/validators/is-exists.validator';

export class AddReviewDto {
  @ApiProperty({ example: '3' })
  @IsNumber()
  rating?: number;

  @ApiProperty({ example: 'Beautiful T-Shirt' })
  @IsString()
  review?: string;

  @ApiProperty({ type: Products })
  @Validate(IsExist, ['Products', 'id'], {
    message: 'product not exist',
  })
  product: Products;

  // @ApiProperty({ type: User })
  // @Validate(IsExist, ['User', 'id'], {
  //   message: 'user not found',
  // })
  // user: User;
}
