import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { WsThrottlerGuard } from './guards/throttler.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 7,
      limit: 5,
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway, WsThrottlerGuard],
})
export class ChatModule {}
