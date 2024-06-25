import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected', socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessaage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      message: 'Hello from server',
      content: body,
    });
    return body;
  }
}
