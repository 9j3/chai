import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/api/chat')
export class ChatController {
  private readonly chats: ChatService;

  public constructor(chats: ChatService) {
    this.chats = chats;
  }

  @Get('/:sender/:receiver')
  public async getChatHistory(
    @Param('sender') senderId,
    @Param('receiver') receiverId,
  ) {
    return await this.chats.getChatsByPair(senderId, receiverId);
  }
}
