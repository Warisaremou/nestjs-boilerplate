import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."roleId" = :roleId', { roleId: RoleEnum.admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            firstName: 'waris',
            lastName: 'AKINOCHO',
            email: 'warisaremou2003@gmail.com',
            password: '@Waris1234',
            role: {
              id: RoleEnum.admin,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        ])
        .execute();
    }
  }
}
