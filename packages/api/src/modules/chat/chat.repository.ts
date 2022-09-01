import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Chat } from './chat.service';

@Injectable()
export class ChatRepository {
  private readonly chats: Chat[];

  public constructor() {
    this.chats = [
      {
        messageId: randomUUID(),
        from: '844dd213-3947-4b10-8242-ffdc92d2adfc',
        to: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        dateSent: new Date('2022-09-01T22:19:00'),
        dateRead: new Date('2022-09-01T22:20:00'),
        content: 'Hello World',
      },
      {
        messageId: randomUUID(),
        from: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        to: '844dd213-3947-4b10-8242-ffdc92d2adfc',
        dateSent: new Date('2022-09-01T22:24:00'),
        dateRead: new Date('2022-09-01T22:25:00'),
        content: 'Hello World, back',
      },
      {
        messageId: randomUUID(),
        from: '844dd213-3947-4b10-8242-ffdc92d2adfc',
        to: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        dateSent: new Date('2022-09-01T22:22:00'),
        content: 'Hello !!',
      },
      {
        messageId: randomUUID(),
        from: '844dd213-3947-4b10-8242-ffdc92d2adfc',
        to: '844dd213-3947-4b10-8242-ffdc92d2adfa',
        dateSent: new Date('2022-09-01T22:19:00'),
        content: 'Hello !!!',
      },
    ];
  }

  /**
   *
   * @param property
   * @param id
   */
  public find(property: string, id: number | string): Chat[] | null {
    return this.chats.filter((chat) => chat[property] === id);
  }

  /**
   *
   * @param senderId
   * @param receiverId
   */
  public findPair(senderId: string, receiverId: string): Chat[] | null {
    return this.chats.filter((chat) => {
      return (
        (chat.from === senderId || chat.from === receiverId) &&
        (chat.to === senderId || chat.to === receiverId)
      );
    });
  }

  /**
   *
   * @param from
   * @param to
   * @param content
   * @param clientSent
   */
  public create(from: string, to: string, content: string, clientSent: Date) {
    const chat = {
      from,
      to,
      content,
      dateSent: clientSent,
      messageId: randomUUID(),
    };

    this.chats.push(chat);

    return chat;
  }
}
