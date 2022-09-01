import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [UsersModule, AuthenticationModule, ChatModule],
  controllers: [],
  providers: [ChatGateway],
})
export class ApplicationModule {}
