import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { User } from '../entities/user.entity';

export class FollowDto {
  @IsNotEmpty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'user not exist',
  })
  follower: User;

  @IsNotEmpty()
  @Validate(IsExist, ['User', 'id'], {
    message: 'user not exist',
  })
  following: User;
}
