import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatRepository {
  private readonly messages: Object[]

  public constructor() {
    this.messages = [
      {
        userId: 1,
        username: 'dario',
        password: 'changeme'
      },
      {
        userId: 2,
        username: 'laurin',
        password: 'secret'
      },
      {
        userId: 3,
        username: 'bruno',
        password: 'pw'
      }
    ]
  }
}
