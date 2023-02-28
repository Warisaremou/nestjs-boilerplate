import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
// import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
// import { Role } from '../../roles/entities/role.entity';
import {
  // IsEmail, MinLength,
  IsOptional, Validate
} from 'class-validator';
// import { Status } from '../../statuses/entities/status.entity';
// import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @ApiProperty({ example: 'test1@example.com' })
  // @Transform(({ value }) => value?.toLowerCase().trim())
  // @IsOptional()
  // @Validate(IsNotExist, ['User'], {
  //   message: 'emailAlreadyExists',
  // })
  // @IsEmail()
  // email?: string | null;

  // @ApiProperty()
  // @IsOptional()
  // @MinLength(6)
  // password?: string;

  // provider?: string;

  // socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ example: 'john52' })
  @IsOptional()
  username?: string | null;

  @ApiProperty({ example: 'Benin' })
  @IsOptional()
  country?: string | null;

  @ApiProperty({ example: 'Cotonou, Akpakpa' })
  @IsOptional()
  address?: string | null;

  @ApiProperty({ example: 'linked/user.com' })
  @IsOptional()
  socialLink?: string | null;

  @ApiProperty({ example: '+229 12345678' })
  @IsOptional()
  phone?: number | null;

  @ApiProperty({ example: 'Disponible pour tous vos accessoires iPhone.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  // @ApiProperty({ type: Role })
  // @IsOptional()
  // @Validate(IsExist, ['Role', 'id'], {
  //   message: 'roleNotExists',
  // })
  // role?: Role | null;

  // @ApiProperty({ type: Status })
  // @IsOptional()
  // @Validate(IsExist, ['Status', 'id'], {
  //   message: 'statusNotExists',
  // })
  // status?: Status;

  // hash?: string | null;
}
