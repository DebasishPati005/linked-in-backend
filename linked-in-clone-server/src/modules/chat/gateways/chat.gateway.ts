import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:9999'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: string) {
    console.log(socket);

    this.server.emit('newMessage', message);
  }

  handleDisconnect() {
    console.log('Method handleDisconnect implemented.');
  }

  handleConnection() {
    console.log('Method handleConnection is called implemented.');
  }
}
