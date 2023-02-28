import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class PaymentStatus extends EntityHelper {
  @ApiProperty({ example: 2 })
  @PrimaryColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Valider' })
  @Column()
  name: string;
}
