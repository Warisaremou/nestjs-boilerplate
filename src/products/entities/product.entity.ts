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
import { EntityHelper } from 'src/utils/entity-helper';
import { ProductToCategory } from './../../categories/entities/product-category.entity';
import { ProductsFilesEntity } from './../../productsFiles/entities/productsFiles.entity';
import { User } from 'src/users/entities/user.entity';
import { ProductsReviews } from './../../reviews/entities/reviews.entity';
import { ProductStatus } from 'src/statuses/entities/productStatus.entity';

@Entity()
export class Products extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  mark: string;

  @OneToMany(
    () => ProductToCategory,
    (productToCategory) => productToCategory.category,
  )
  productToCategory: ProductToCategory[];

  @OneToMany(() => ProductsFilesEntity, (picture) => picture.product)
  // @JoinColumn({ name: 'pictures_id' })
  pictures?: ProductsFilesEntity[];

  /*user (seller) */
  @ManyToOne(() => User, (seller) => seller.productsForSale, {
    nullable: false,
  })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  /*user (buyer) */
  @ManyToOne(() => User, (buyer) => buyer.purchasedProducts, { nullable: true })
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => ProductStatus, { nullable: false })
  // @JoinColumn({ name: 'product_status' })
  status?: ProductStatus;

  @OneToMany(() => ProductsReviews, (review) => review.product)
  @JoinColumn({ name: 'rewiews_id' })
  reviews?: ProductsReviews[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
