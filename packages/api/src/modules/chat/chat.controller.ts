import { Controller, Get, Param } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Controller('/api/chat')
export class ChatController {
  public constructor(
    private readonly chats: ChatService,
    private readonly sockets: ChatGateway,
  ) {
    this.chats = chats;
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

  @Get('/messages/:roomId')
  public getMessagesByRoom(@Param() { roomId }) {
    console.log('getMessagesByRoom', roomId);
    return this.chats.getChatsByRoomId(roomId);
  }

  @Get('/clients')
  public getClients() {
    return {
      clients: this.sockets.users,
    };
  }
}
