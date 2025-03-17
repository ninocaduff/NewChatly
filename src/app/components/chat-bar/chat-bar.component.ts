import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  imports: [FormsModule],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css'
})
export class ChatBarComponent {

chatMessage: string = '';

addMessage(message: string): void {
  // Add the message to the chat
  console.log(this.chatMessage);
  alert(message);
}

}