import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { Status } from '../../statuses/entities/status.entity';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(8)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: 'john52' })
  @IsNotEmpty()
  username?: string;

  @ApiProperty({ example: 'Benin' })
  @IsNotEmpty()
  country?: string;

  @ApiProperty({ example: 'Cotonou, Akpakpa' })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'linked/user.com' })
  @IsOptional()
  socialLink?: string;

  @ApiProperty({ example: '+229 12345678' })
  @IsOptional()
  phone?: number;

  @ApiProperty({ example: 'Disponible pour tous vos accessoires iPhone.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;

  hash?: string | null;
}
