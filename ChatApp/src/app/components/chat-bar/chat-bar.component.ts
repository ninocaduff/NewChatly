import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  imports: [FormsModule],
  templateUrl: './chat-bar.component.html',
  styleUrl: './chat-bar.component.css'
})
export class ChatBarComponent {
  @Output() submitMessage = new EventEmitter<string>();
  
  chatMessage = '';
  warningMessage = '';

  addMessage(message: string): void {
    const trimmed = message.trim();
    if (trimmed.length === 0) return;

    if (trimmed.length > 500) {
      this.warningMessage = 'Die Nachricht darf maximal 500 Zeichen lang sein.';
      return;
    }
    this.warningMessage = ''; // clear it if successful

    const now = new Date();
    const time = now.toLocaleTimeString('de', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const messageToSend = `<b>${time}</b> - ${trimmed}<br>`;
    this.submitMessage.emit(messageToSend);
    this.chatMessage = ''; // Leere das Textfeld nach dem Senden
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Verhindere Zeilenumbruch

      const trimmed = this.chatMessage.trim();
      if (trimmed.length === 0) return;

      this.addMessage(trimmed);
    }
  }
}
