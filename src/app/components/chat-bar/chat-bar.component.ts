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
  console.log(this.chatMessage);
  alert(message);
}

}