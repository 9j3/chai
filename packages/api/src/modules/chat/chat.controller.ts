import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Controller('/api/chat')
export class ChatController {
  public constructor(
    private readonly chats: ChatService,
    private readonly sockets: ChatGateway,
  ) {
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

  @Get('/clients')
  public getClients() {
    return {
      clients: this.sockets.users,
    };
  }
}
