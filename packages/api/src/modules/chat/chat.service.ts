import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

export interface Chat {
  messageId: string;
  from: string;
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

  /**
   *
   * @param sender
   * @param receiver
   */
  public async getChatsByPair(
    sender: string,
    receiver: string,
  ): Promise<Chat[]> {
    return this.chats.findPair(sender, receiver);
  }
}
