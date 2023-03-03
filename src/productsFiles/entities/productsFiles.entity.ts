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
  @Column({ type: 'json', array: true })
  path: string[];

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    for (let i = 0; i < this.path.length; i++) {
      if (this.path[i].indexOf('/') === 0) {
        this.path[i] = appConfig().backendDomain + this.path[i];
      }
    }
  }

  @ManyToOne(() => Products, (product) => product.pictures)
  product: Products;
}
