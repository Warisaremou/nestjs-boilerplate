import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterLoad,
  AfterInsert,
  // ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import appConfig from '../../config/app.config';

@Entity({ name: 'products_files' })
export class ProductsFilesEntity extends EntityHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Allow()
  @ApiProperty({ type: [String] })
  @Column({ type: 'json' })
  path: string[] | [];

  @AfterLoad()
  @AfterInsert()
  updatePath() {
    const newPath = this.path.slice();
    for (let i = 0; i < this.path.length; i++) {
      if (newPath[i].indexOf('/') === 0) {
        newPath[i] = appConfig().backendDomain + newPath[i];
      }
    }
    this.path = newPath;
  }
}
