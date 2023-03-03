import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { FileEntity } from '../../files/entities/file.entity';

export class AuthUpdateDto {
  
  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  firstName?: string;
  
  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  lastName?: string;

  @ApiProperty({ example: 'john52' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  username?: string | null;

  @ApiProperty({ example: 'Benin' })
  @IsOptional()
  country?: string | null;

  @ApiProperty({ example: 'Cotonou, Akpakpa' })
  @IsOptional()
  address?: string | null;

  @ApiProperty({ example: '22912345678' })
  @IsOptional()
  phone?: number | null;

  @ApiProperty({ example: 'Disponible pour tous vos accessoires iPhone.' })
  @IsOptional()
  description?: string | null;
  
  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;
}
