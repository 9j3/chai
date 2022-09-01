import { Body, Controller, Get, Param } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { UserRequest } from '../../requests';

export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    token: string;
    refresh_token?: string;
  };
}

@Controller('/api/users')
export class UserController {
  private readonly users: UsersService;

  /**
   *
   * @param users
   */
  public constructor(users: UsersService) {
    this.users = users;
  }

  @Get('/')
  public async fetchAll() {
    return {
      status: 'success',
      data: await this.users.findMany(),
    };
  }

  @Get('/:id')
  public async fetchById(@Param('id') id) {
    return {
      status: 'success',
      data: await this.users.findForId(id),
    };
  }
}
