import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, etc.

export interface ChatMessage {
  id?: string; // Optional message ID
  username: string;
  message: string;
  time: string; // Formatted time string
  rawDate?: Date; // Optional raw date for more complex operations
  ariaLabel?: string;
}

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Good for performance with list items
})
export class ChatMessageComponent {
  @Input() msg!: ChatMessage;

  constructor() {}
}
