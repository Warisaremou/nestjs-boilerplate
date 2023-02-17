import { Carts } from 'src/carts/entities/carts.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from './../../utils/entity-helper';
import { User } from 'src/users/entities/user.entity';
import { IsNumber, IsString } from 'class-validator';
import { OrderStatus } from './../../statuses/entities/orderStatus.entity';
import { Payments } from 'src/payments/entities/payment.entity';

@Entity()
export class Orders extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNumber()
  total: number;

  @Column({ nullable: true })
  shipping_date: Date;

  @Column({ nullable: false })
  @IsString()
  delivery_adress: string;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Carts, (cart) => cart.order, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'carts_id' })
  carts: Carts[];

  @ManyToOne(() => Payments, (payment) => payment.order, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'payment_id' })
  payment: Payments;

  @ManyToOne(() => OrderStatus, { eager: true, nullable: false })
  @JoinColumn({ name: 'order_status' })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
