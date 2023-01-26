import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Products } from './../../products/entities/product.entity';

@Entity()
export class ProductsReviews extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  /**
    @Column()
    likes: number;
  */

  @Column()
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => Products, (product) => product.reviews)
  product: Products;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
