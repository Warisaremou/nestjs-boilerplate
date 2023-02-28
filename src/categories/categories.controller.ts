import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private categoriesServices: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoriesServices.create(createCategory);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.categoriesServices.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.categoriesServices.findOne(id);
  }

  // Get by ids
  @Get(':ids')
  @HttpCode(HttpStatus.OK)
  async findAllByIds(@Param('ids') ids: string) {
    const idArray = ids.split(',').map(Number);
    return await this.categoriesServices.findAllByIds(idArray);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesServices.update(id, updateCategoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriesServices.softDelete(id);
  }
}
