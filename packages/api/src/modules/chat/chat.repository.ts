import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Chat } from './chat.service';

@Injectable()
export class ChatRepository {
  public readonly chats: Chat[];

  public constructor() {
    this.chats = [];
  }

  /**
   *
   * @param property
   * @param id
   */
  public find(property: keyof Chat, id: number | string): Chat[] | null {
    return this.chats.filter((chat) => chat[property] === Number(id));
  }

  /**
   *
   * @param from
   * @param to
   * @param content
   * @param clientSent
   */
  public create(
    sender: string,
    to: string,
    content: string,
    clientSent: Date,
    roomId: number,
  ) {
    const chat = {
      sender,
      to,
      content,
      roomId,
      dateSent: clientSent,
      messageId: randomUUID(),
    };

    this.chats.push(chat);

    return chat;
  }
}
