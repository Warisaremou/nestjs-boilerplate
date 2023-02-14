import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { OrderStatus } from 'src/statuses/entities/orderStatus.entity';
import { OrderStatusEnum } from 'src/statuses/orderStatus.enum';

export default class CreateStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(OrderStatus, 'OrderStatus')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(OrderStatus)
        .values([
          {
            id: OrderStatusEnum.attente,
            name: 'en attente de paiement',
          },
          { id: OrderStatusEnum.expédiée, name: 'expédiée' },
          { id: OrderStatusEnum.annulée, name: 'annulée' },
        ])
        .execute();
    }
  }
}
