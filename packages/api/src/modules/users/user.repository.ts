import { Injectable } from '@nestjs/common';
import { User } from './users.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersRepository {
  private readonly users: User[];

  public constructor() {
    this.users = [
      {
        userId: '844dd213-3947-4b10-8242-ffdc92d2adfc',
        username: 'bruno',
        fullName: 'Bruno Hammer',
        password: 'changeme',
      },
      {
        userId: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        username: 'irene',
        fullName: 'Irene S. Mosig',
        password: 'secret',
      },
      {
        userId: '844dd213-3947-4b10-8242-ffdc92d2adfb',
        username: 'andi',
        fullName: 'Andreas Holzer',
        password: 'pw',
      },
    ];
  }

  /**
   *
   * @param property
   * @param id
   */
  public find(property: string, id: number | string): User | null {
    return this.users.find((user) => user[property] === id);
  }

  /**
   *
   * @param property
   * @param id
   */
  public findMany(): User[] | null {
    return this.users;
  }
  /**
   *
   * @param username
   * @param password
   */
  public create(username: string, password: string) {
    const user = {
      username,
      password,
      userId: randomUUID(),
    };

    this.users.push(user);

    return user;
  }
}
