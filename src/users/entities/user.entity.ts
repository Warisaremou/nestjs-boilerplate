import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { FileEntity } from '../../files/entities/file.entity';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { Products } from './../../products/entities/product.entity';
import { ProductsReviews } from 'src/reviews/entities/reviews.entity';
import { Carts } from 'src/carts/entities/carts.entity';
import { Orders } from './../../orders/entities/order.entity';

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  password: string;

  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ nullable: true })
  socialId: string | null;

  @Index()
  @Column({ nullable: true })
  firstName: string | null;

  @Index()
  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  username: string | null;

  @Column({ nullable: true })
  country: string | null;

  @Column({ nullable: true })
  address: string | null;

  @Column({ nullable: true })
  socialLink: string | null;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @ManyToMany(() => User, (user) => user.followings)
  @JoinTable({
    name: 'follows',
    joinColumn: { name: 'followerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followingId', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: 'follows',
    joinColumn: { name: 'followingId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followerId', referencedColumnName: 'id' },
  })
  followings: User[];

  //products for sale
  @OneToMany(() => Products, (product) => product.seller, {
    eager: true,
  })
  productsForSale: Products[];

  //purchased products
  @OneToMany(() => Products, (product) => product.buyer)
  purchasedProducts: Products[];

  // user rewiews
  @OneToMany(() => ProductsReviews, (rewiew) => rewiew.user, {
    eager: true,
  })
  reviews: ProductsReviews[];

  // user carts
  @OneToMany(() => Carts, (cart) => cart.user, { eager: true })
  carts: Carts[];

  // user orders
  @OneToMany(() => Orders, (order) => order.user, { eager: true })
  orders: Orders[];

  @Column({ nullable: true })
  @Index()
  hash: string | null;

  // user last connexion

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
