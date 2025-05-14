import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChatMessage {
  id?: string;
  username: string;
  message: string;
  time: string;
  rawDate?: Date;
  ariaLabel?: string;
  fromSelf?: boolean;
  dateString?: string;
}

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  encapsulation: ViewEncapsulation.None, // <- Hinzugefügt
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input() msg!: ChatMessage;
}
