import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleMessage(socket: Socket, message: string): void;
    handleDisconnect(): void;
    handleConnection(): void;
}
