import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './../../products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];

  @Column({ nullable: false })
  @IsNumber()
  quantity: number;

  @Column({ nullable: false })
  @IsNumber()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
