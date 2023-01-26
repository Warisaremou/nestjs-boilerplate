import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from './../entities/category.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category Name' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotExist, ['Categories'], {
    message: 'Category already exist',
  })
  name: string;

  @ApiProperty({ example: 'Category Description' })
  @IsString()
  description: string;

  @ApiProperty({ type: Categories })
  @IsOptional()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'Parent category not exist',
  })
  parent: Categories;
}
