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

  @Get('/rooms')
  public getRooms() {
    return [
      {
        roomId: 1,
        name: 'Chatroom #1',
      },
      {
        roomId: 2,
        name: 'Chatroom #2',
      },
      {
        roomId: 3,
        name: 'Important News',
      },
    ];
  }
}
