import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://chatlyhsg.onrender.com'); // ⬅️ replace with your backend URL
  }

  sendMessage(message: any): void {
    this.socket.emit('newMessage', message);
  }

  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }
}
