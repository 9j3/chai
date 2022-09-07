import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

export interface Chat {
  messageId: string;
  roomId: number;
  sender: string;
  to: string;
  dateSent: Date;
  dateRead?: Date;
  content: string;
}

@Injectable()
export class ChatService {
  private readonly chats: ChatRepository;

  /**
   *
   * @param chats
   */
  public constructor(chats: ChatRepository) {
    this.chats = chats;
  }

  public getChatsByRoomId(roomId: number) {
    console.log('service::getChatsByRoomId', roomId);
    return this.chats.find('roomId', roomId);
  }
}
