import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3000, { cors: { origin: '*' } })  
export class AlertGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Gestion de la connexion d'un client
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Gestion de la déconnexion d'un client
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Recevoir un message (alerte) depuis le client (Python)
  @SubscribeMessage('alert')
  handleAlert(client: Socket, payload: { message: string }) {
    console.log(`Received alert: ${payload.message}`);
    
  }
}
