import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PaymentStatus } from 'src/statuses/entities/paymentStatus.entity';
import { PaymentStatusEnum } from 'src/statuses/paymentStatus.enum';

export default class CreatePaymentStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(PaymentStatus, 'PaymentStatus')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(PaymentStatus)
        .values([
          {
            id: PaymentStatusEnum.attente,
            name: 'En attente',
          },
          { id: PaymentStatusEnum.valider, name: 'Valider' },
          { id: PaymentStatusEnum.echouer, name: 'Echouer' },
          { id: PaymentStatusEnum.rembourser, name: 'Rembourser' },
        ])
        .execute();
    }
  }
}
