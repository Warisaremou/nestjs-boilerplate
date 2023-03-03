import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { plainToClass } from 'class-transformer';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."roleId" = :roleId', { roleId: RoleEnum.user })
      .getCount();

    if (countUser === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            username: 'john.doe51',
            password: 'john1234',
            role: {
              id: RoleEnum.user,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
          plainToClass(User, {
            email: 'bilalinoussa@gmail.com',
            firstName: 'Bilal',
            lastName: 'INOUSSA',
            username: 'bil-56',
            password: 'bilal1234',
            role: {
              id: RoleEnum.user,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
          plainToClass(User, {
            email: 'oscarassogba@gmail.com',
            firstName: 'Oscar',
            lastName: 'ASSOGBA',
            username: 'assogba2.5',
            password: 'oscar1234',
            role: {
              id: RoleEnum.user,
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
