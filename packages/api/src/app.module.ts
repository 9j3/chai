import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [],
  providers: [ChatGateway],
})
export class ApplicationModule {}
