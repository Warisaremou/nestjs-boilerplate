import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from './../../utils/entity-helper';
import { IsNumber } from 'class-validator';
import { Orders } from 'src/orders/entities/order.entity';

@Entity()
export class Payments extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNumber()
  amount: number;

  @Column({ nullable: false })
  payment_date: Date;

  @OneToMany(() => Orders, (order) => order.payment, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
