import { Injectable } from '@nestjs/common';
import { User } from './users.service';


@Injectable()
export class UsersRepository {
  private readonly users: User[];

  public constructor() {
    this.users = [
      {
        userId: 1,
        username: 'dario',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'laurin',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'bruno',
        password: 'pw',
      },
    ];
  }

  /**
   *
   * @param property
   * @param id
   */
  public find(property : string, id: number | string): User | null {
    return this.users.find(user => user[property] === id);
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
      userId : this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

}