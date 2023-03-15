import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Follow extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers, {
    nullable: true,
  })
  @JoinColumn({ name: 'follower_id' })
  followers: User;

  @ManyToOne(() => User, (user) => user.followings, {
    nullable: true,
  })
  @JoinColumn({ name: 'following_id' })
  followings: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
