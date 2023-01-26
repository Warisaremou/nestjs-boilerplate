import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
import { Categories } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
