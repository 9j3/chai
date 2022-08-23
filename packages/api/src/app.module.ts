import { Module } from '@nestjs/common'

import { UsersModule } from './modules/users/users.module'
import { AuthenticationModule } from './modules/auth/auth.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [UsersModule, EventsModule, AuthenticationModule],
  controllers: [],
  providers: []
})
export class ApplicationModule {}
