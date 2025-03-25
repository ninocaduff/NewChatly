import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  imports: [FormsModule],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css'
})
export class ChatBarComponent {

@Output() submitMessage= new EventEmitter<string>();

chatMessage = '';

addMessage(message: string): void {
  const now = new Date();
  const time = now.toLocaleTimeString('de', {
    hour: '2-digit',
    minute: '2-digit'
    });

  const messageToSend = `<b>${time}</b> - ${message}<br>`;
  this.submitMessage.emit(messageToSend);
  }

onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // prevent newline

    const trimmed = this.chatMessage.trim();
    if (trimmed.length === 0) return; // don't send empty messages

    this.addMessage(trimmed);
    this.chatMessage = ''; // clear textarea
    }
  }
}