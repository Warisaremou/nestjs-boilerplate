import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { Follow } from './../follow/entites/follow.entity';
import { FollowDto } from './dto/create-follow.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) // @InjectRepository(Follow)
  // private followRepository: Repository<Follow>,
  {}

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
    await this.usersRepository.delete(id);
  }

  async follow(followDto: FollowDto) {
    const { follower, following } = followDto;
    const followerUser = await this.usersRepository.findOne(follower.id, {
      relations: ['followings'],
    });
    const followingUser = await this.usersRepository.findOne(following.id, {
      relations: ['followers'],
    });

    followerUser.followings.push(followingUser);
    followingUser.followers.push(followerUser);

    await this.usersRepository.save(followerUser);
    await this.usersRepository.save(followingUser);

    // const createFollow = await this.followRepository.create(followDto);
    // await this.followRepository.save(createFollow);

    return followDto;
  }

  async unfollow(followerId: number, followingId: number): Promise<void> {
    // const follow = await this.followRepository.findOne({
    //   where: { followerId, followingId },
    // });
    const followerUser = await this.usersRepository.findOne(followerId, {
      relations: ['followings'],
    });
    const followingUser = await this.usersRepository.findOne(followingId, {
      relations: ['followers'],
    });

    followerUser.followings = followerUser.followings.filter(
      (following) => following.id !== followingId,
    );
    followingUser.followers = followingUser.followers.filter(
      (follower) => follower.id !== followerId,
    );

    await this.usersRepository.save(followerUser);
    await this.usersRepository.save(followingUser);

    // await this.followRepository.remove(follow);
  }

  async getFollowers(userId: number): Promise<User[]> {
    // const followings = await this.followRepository.find({
    //   where: { followingId: userId },
    // });
    // const followerIds = followings.map((following) => following.followerId);
    // const followers = await this.usersRepository.findByIds(followerIds);
    // return followers;
    const user = await this.usersRepository.findOne(userId, {
      relations: ['followers'],
    });
    return user.followers;
  }

  async getFollowings(userId: number): Promise<User[]> {
    // const followings = await this.followRepository.find({
    //   where: { followerId: userId },
    // });
    // const followingIds = followings.map((following) => following.followingId);
    // const userFollowings = await this.usersRepository.findByIds(followingIds);
    // return userFollowings;
    const user = await this.usersRepository.findOne(userId, {
      relations: ['followings'],
    });
    return user.followings;
  }
}
