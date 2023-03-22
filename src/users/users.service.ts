import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FollowDto } from './dto/create-follow.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    const user = this.usersRepository.findOne({
      where: fields,
      relations: ['followers', 'followings'],
    });
    return user;
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

    return followDto;
  }

  async unfollow(followDto: FollowDto): Promise<void> {
    const { follower, following } = followDto;
    console.log(follower, following);
    const followerUser = await this.usersRepository.findOne(follower.id, {
      relations: ['followings'],
    });
    const followingUser = await this.usersRepository.findOne(following.id, {
      relations: ['followers'],
    });

    followerUser.followings = followerUser.followings.filter(
      (following) => following.id !== following.id,
    );
    followingUser.followers = followingUser.followers.filter(
      (follower) => follower.id !== follower.id,
    );

    await this.usersRepository.save(followerUser);
    await this.usersRepository.save(followingUser);
  }

  async getFollowers(userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['followers'],
    });
    return user.followers;
  }

  async getFollowings(userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['followings'],
    });
    return user.followings;
  }
}
