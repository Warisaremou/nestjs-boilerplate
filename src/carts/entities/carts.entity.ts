import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './../../products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { IsNumber } from 'class-validator';
import { Orders } from './../../orders/entities/order.entity';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Products, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column({ nullable: false })
  @IsNumber()
  quantity: number;

  @Column({ nullable: false })
  @IsNumber()
  total: number;

  @ManyToOne(() => Orders, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
