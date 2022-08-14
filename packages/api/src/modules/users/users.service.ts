import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { RegisterRequest } from '../../requests';
import { UsersRepository } from './user.repository';

export interface User {
  userId: number,
  username: string,
  password: string
}



@Injectable()
export class UsersService {
  private readonly users: UsersRepository;

  /**
   *
   * @param users
   */
  public constructor(users: UsersRepository) {
    this.users = users;
  }

  /**
   *
   * @param user
   * @param password
   */
  public async validateCredentials(user: User, password: string): Promise<boolean> {
    return password === user.password;
  }

  /**
   *
   * @param request
   */
  public async createUserFromRequest(request: RegisterRequest): Promise<User> {
    const { username, password } = request;

    const existingFromUsername = await this.findForUsername(request.username);

    if (existingFromUsername) {
      throw new UnprocessableEntityException('Username already in use');
    }

    return this.users.create(username, password);
  }

  /**
   *
   * @param id
   */
  public async findForId(id: number): Promise<User | null> {
    return this.users.find('userId', id);
  }

  /**
   *
   * @param username
   */
  public async findForUsername(username: string): Promise<User | null> {
    return this.users.find('username', username);
  }

}