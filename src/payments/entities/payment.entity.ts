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
import { IsNumber } from 'class-validator';
import { Orders } from 'src/orders/entities/order.entity';
import { PaymentStatus } from 'src/statuses/entities/paymentStatus.entity';

@Entity()
export class Payments extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNumber()
  amount: number;

  @Column({ nullable: false })
  payment_date: Date;

  @Column({ nullable: false })
  payment_method: string;

  @Column({ nullable: false })
  transation_details: string;

  @Column({ nullable: false })
  transaction_number: string;

  @OneToMany(() => Orders, (order) => order.payment, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders[];

  @ManyToOne(() => PaymentStatus, { nullable: false })
  payment_status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
