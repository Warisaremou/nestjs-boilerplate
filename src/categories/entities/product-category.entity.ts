import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Products } from './../../products/entities/product.entity';
import { Categories } from './category.entity';

@Entity()
@Tree('materialized-path')
export class ProductToCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Products)
  @JoinColumn()
  product: Products;

  @ManyToOne(() => Categories)
  @JoinColumn()
  category: Categories;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
