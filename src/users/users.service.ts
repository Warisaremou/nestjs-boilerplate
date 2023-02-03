import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Follow } from './../follow/entites/follow.entity';
import { FollowDto } from './dto/create-follow.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateProfileDto: UpdateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async follow(followDto: FollowDto) {
    // const followerUser = await this.usersRepository.findOne(followDto.follower);
    // Adding the following userId to the follower's following list
    // followerUser.followings.push();

    // const followingUser = await this.usersRepository.findOne(
    //   followDto.following,
    // );
    // followingUser.followers.push(followDto.follower);

    const createFollow = await this.followRepository.create({ ...followDto });

    return this.followRepository.save(createFollow);
  }

  async unfollow(followerId: number, followingId: number): Promise<void> {
    const follow = await this.followRepository
      .createQueryBuilder()
      .where('follower_id = :followerId', { followerId })
      .andWhere('following_id = :followingId', { followingId })
      .getOne();

    await this.followRepository.remove(follow);
  }
}
