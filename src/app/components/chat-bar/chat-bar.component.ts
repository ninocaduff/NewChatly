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
  const timestamp = new Date().toLocaleString('de') ;
  const messageToSend = `<b>${timestamp}</b> - ${message}<br>`;
  
  this.submitMessage.emit(messageToSend);
  }

}