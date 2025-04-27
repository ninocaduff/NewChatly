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

  addMessage(message: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('de', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Die Nachrichtenformatierung ist vereinfacht, da der Nickname
    // in der App-Komponente hinzugefügt wird
    const messageToSend = `<b>${time}</b> - ${message}<br>`;
    this.submitMessage.emit(messageToSend);
    this.chatMessage = ''; // Leere das Textfeld nach dem Senden
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Verhindere Zeilenumbruch

      const trimmed = this.chatMessage.trim();
      if (trimmed.length === 0) return; // Sende keine leeren Nachrichten

      this.addMessage(trimmed);
    }
  }
}
