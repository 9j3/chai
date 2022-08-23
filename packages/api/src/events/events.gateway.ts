import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  doStuff(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.emit('hello', { date: Date.now() })
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }
}
