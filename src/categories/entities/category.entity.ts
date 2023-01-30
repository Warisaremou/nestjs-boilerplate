import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { ProductToCategory } from './product-category.entity';

@Entity()
@Tree('materialized-path')
export class Categories extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @TreeChildren()
  children: Categories[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Categories;

  @OneToMany(
    () => ProductToCategory,
    (productToCategory) => productToCategory.product,
  )
  productToCategory: ProductToCategory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
