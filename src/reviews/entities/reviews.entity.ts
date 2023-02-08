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
import { EntityHelper } from 'src/utils/entity-helper';
import { Products } from './../../products/entities/product.entity';
import { User } from './../../users/entities/user.entity';

@Entity()
export class ProductsReviews extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  review: string;

  @ManyToOne(() => Products, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
