import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/auth/auth.module';
import { EventsModule } from './events/events.module';
import { ChatGateway } from './modules/chat/chat.gateway';

@Module({
  imports: [UsersModule, EventsModule, AuthenticationModule],
  controllers: [],
  providers: [ChatGateway],
})
export class ApplicationModule {}
