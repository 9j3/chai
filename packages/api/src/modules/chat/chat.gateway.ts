import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export interface Message {
  sender: string;
  value: string;
  id: number;
  dateSent?: Date;
}

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  public users: any = {};
  private userId: any = [];

  /**
   * Handles the disconnect of a specific user and emits an event to all other users
   * @param client
   */
  handleDisconnect(client: Socket): void {
    // user is offline
    console.log('DISCONNECT');

    // notify all connected client's that there is a new leave
    client.broadcast.emit('client:disconnect', {
      id: client.id,
      client: this.users[client.id],
    });

    delete this.users[client.id];
    client.disconnect();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]): void {
    console.log('New Connection :)', client.id);

    this.users[client.id] = {};
    this.userId.push(client.id);

    // broadcast (user is online)
    client.broadcast.emit('newClient', this.users[client.id]);
  }

  /**
   *
   * @param client
   * @param username
   */
  @SubscribeMessage('setUsername')
  setUsername(client: Socket, username: string) {
    this.users[client.id]['username'] = username;
    this.users[client.id]['isTyping'] = false;

    // notify all connected client's that there is a new connection
    client.broadcast.emit('client:connect', {
      id: client.id,
      client: this.users[client.id],
    });

    // send message only to new user
    this.wss.to(client.id).emit('acknowledgeConnection', this.users);
  }

  @SubscribeMessage('typing:start')
  startTyping(client: Socket) {
    console.log(`Client ${client.id} started typing`);
    // tell other clients that client is typing
    client.broadcast.emit('typing:start', {
      client: client.id,
    });
  }

  @SubscribeMessage('typing:stop')
  stopTyping(client: Socket) {
    console.log(`Client ${client.id} stopped typing`);

    // tell other clients that client is typing
    client.broadcast.emit('typing:stop', {
      client: client.id,
    });
  }

  /**
   * Hook called after server is initialised
   * @param server
   */
  afterInit(server: Server): any {}

  /**
   * Handler when a message is sent
   * @param client
   * @param data
   */
  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    data: { message: Message; room: string },
  ): Promise<void> {
    console.dir(`New message to room ${data.room}. value ${data.message}`);
    this.wss.to(data.room).emit('newMessage', data.message);
  }

  @SubscribeMessage('switchRoom')
  switchRoom(client: Socket, data: { before: number; after: number }) {
    console.dir(
      `Client ${client.id} switches from room ${data.before} in room ${data.after}`,
    );

    client.leave(String(data.before));
    client.join(String(data.after));
  }

  /**
   * event handler when new user joins
   * @param client
   * @param room
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    console.dir(`Client ${client.id} joins room ${room}`);
    client.join(room);
    client.broadcast
      .to(room)
      .emit('joinRoom1', { user: this.users[client.id], id: client.id });
  }

  /**
   * event handler when specific user disconnects
   * @param client
   * @param room
   */
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.broadcast.to(room).emit(`${this.users[client.id]} left ${room}`);
  }
}
