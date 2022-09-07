import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Chat } from './chat.service';

@Injectable()
export class ChatRepository {
  public readonly chats: Chat[];

  public constructor() {
    this.chats = [
      {
        messageId: randomUUID(),
        sender: 'Bruno Hammer',
        to: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        dateSent: new Date('2022-09-01T22:19:00'),
        dateRead: new Date('2022-09-01T22:20:00'),
        roomId: 1,
        content: 'Hello World',
      },
    ];
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
