import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersRepository } from './user.repository'
import { UserController } from './users.controller'

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
  controllers: [UserController]
})
export class UsersModule {}
