import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import appConfig from '../../config/app.config';
import { Products } from '../../products/entities/product.entity';

@Entity({ name: 'products_files' })
export class ProductsFilesEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @Column()
  path: string;

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    if (this.path.indexOf('/products_files') === 0) {
      this.path = appConfig().backendDomain + this.path;
    }
  }

  @ManyToOne(() => Products, (product) => product.pictures)
  product: Products;
}
