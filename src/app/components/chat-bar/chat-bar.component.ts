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
  }); // e.g. 22:54

  const messageToSend = `<b>${time}</b> - ${message}<br>`;
  this.submitMessage.emit(messageToSend);
  this.chatMessage = ''; // clear textarea
}


  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // prevent newline
      this.addMessage(this.chatMessage); // send
      this.chatMessage = ''; // clear textarea
    }
  }

}