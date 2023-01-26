import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ProductStatus } from 'src/statuses/entities/productStatus.entity';
import { ProductStatusEnum } from 'src/statuses/productStatus.enum';

export default class CreateStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(ProductStatus, 'ProductStatus')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(ProductStatus)
        .values([
          { id: ProductStatusEnum.nouveau, name: 'Nouveau' },
          { id: ProductStatusEnum.utilise, name: 'Utilise' },
        ])
        .execute();
    }
  }
}
