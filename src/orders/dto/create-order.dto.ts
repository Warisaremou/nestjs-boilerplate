import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
// import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Carts } from 'src/carts/entities/carts.entity';
import { OrderStatus } from 'src/statuses/entities/orderStatus.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Payments } from 'src/payments/entities/payment.entity';

export class CreateOrderDto {
  @ApiProperty({ example: '25030' })
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty({ example: '02-12-2021' })
  @IsNotEmpty()
  @IsDate()
  shipping_Date: Date;

  @ApiProperty({ example: 'Oui', default: false })
  @IsNotEmpty()
  @IsBoolean()
  is_delivered: boolean;

  @ApiProperty({ example: 'Oui', default: false })
  @IsNotEmpty()
  @IsBoolean()
  is_cancelled: boolean;

  @ApiProperty({ example: 'Cotonou, Akpakpa' })
  @IsNotEmpty()
  @IsString()
  delivery_adress: string;

  // @ApiProperty({ type: User })
  // @IsNotEmpty()
  // @Validate(IsExist, ['User', 'id'], {
  //   message: 'user not exist',
  // })
  // user: User;

  @ApiProperty({ type: Carts })
  @IsNotEmpty()
  @Validate(IsExist, ['Carts', 'id'], {
    message: 'cart or carts not exist',
  })
  carts: Carts[];

  @ApiProperty({ type: Payments })
  // @IsNotEmpty()
  @Validate(IsExist, ['Payments', 'id'], {
    message: 'payment not exist',
  })
  payment?: Payments;

  @ApiProperty({ type: OrderStatus })
  @IsNotEmpty()
  @Validate(IsExist, ['OrderStatus', 'id'], {
    message: 'order status not exist',
  })
  status?: Status;
}
