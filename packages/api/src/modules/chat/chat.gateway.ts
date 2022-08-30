import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private users: any = {};
  private userid: any = {};
  private ctr = 0;

  /**
   * Handles the disconnect of a specific user and emits an event to all other users
   * @param client
   */
  handleDisconnect(client: Socket): void {
    // user is offline
    client.broadcast.emit(`user ${this.users[client.id]} left the channel`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]): void {
    this.users[client.id] = ++this.ctr;
    this.userid.push(client.id);

    // broadcast (user is online)
    client.broadcast.emit(`user ${this.users[client.id]} joined the channel`);

    // send message only to new user
    this.wss
      .to(this.userid[this.ctr - 1])
      .emit(`Welcome To the chai chat user ${this.ctr}`);
  }

  /**
   * Hook called after server is initialised
   * @param server
   */
  afterInit(server: Server): any {
    console.log('Initialised');
  }

  /**
   * Handler when a message is sent
   * @param client
   * @param data
   */
  @SubscribeMessage('chat')
  async handleMessage(
    client: Socket,
    data: { message: string; room: string },
  ): Promise<void> {
    this.wss.emit(
      'chat',
      `message from user ${this.users[client.id]} ==>> ${data}`,
    );
  }

  /**
   * event handler when new user joins
   * @param client
   * @param room
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    client.broadcast.to(room).emit(`${this.users[client.id]} joined ${room}`);
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
