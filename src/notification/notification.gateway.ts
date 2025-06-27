import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class NotificationGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: any) {
      console.log(`Client connected: ${client.id}`);
    }
  
    sendAlertNotification(data: any) {
      this.server.emit('alert', data); // 'alert' is the event name
    }
  }
  