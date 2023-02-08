import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from './../../utils/entity-helper';

@Entity()
export class Orders extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
}
