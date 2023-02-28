import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { OrderStatus } from 'src/statuses/entities/orderStatus.entity';
import { OrderStatusEnum } from 'src/statuses/orderStatus.enum';

export default class CreateOrderStatus implements Seeder {
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
            name: 'En attente de paiement',
          },
          { id: OrderStatusEnum.expedier, name: 'Expédier' },
          { id: OrderStatusEnum.valider, name: 'Valider' },
          { id: OrderStatusEnum.annuler, name: 'Annuler' },
        ])
        .execute();
    }
  }
}
