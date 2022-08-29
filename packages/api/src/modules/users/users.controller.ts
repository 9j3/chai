import { Controller, Get } from '@nestjs/common'
import { User, UsersService } from '../users/users.service'

export interface AuthenticationPayload {
  user: User
  payload: {
    type: string
    token: string
    refresh_token?: string
  }
}

@Controller('/api/users')
export class UserController {
  private readonly users: UsersService

  /**
   *
   * @param users
   * @param tokens
   */
  public constructor(users: UsersService) {
    this.users = users
  }

  /**
   *
   * @param body
   */
  @Get('/')
  public async fetchAll() {
    return {
      status: 'success',
      data: await this.users.findMany()
    }
  }
}