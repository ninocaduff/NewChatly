// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://chatlyhsg.onrender.com'); // ✅ your backend
    this.socket.on('connect', () => {
      console.log('🟢 Socket connected:', this.socket.id);
    });
  }

  // ✅ Send message to server
  sendMessage(message: any): void {
    this.socket.emit('newMessage', message);
  }

  // ✅ Listen for messages from server
  onMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        console.log('📨 Received from server:', data);
        observer.next(data);
      });
    });
  }

  // ✅ Send typing event
  sendTyping(username: string): void {
    this.socket.emit('typing', { username });
  }

  // ✅ Listen for typing events
  onTyping(): Observable<{ username: string }> {
    return new Observable((observer) => {
      this.socket.on('typing', (data) => {
        console.log('📨 Typing:', data);
        observer.next(data);
      });
    });
  }
}
