import { AfterViewChecked, Component, ElementRef, Input, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor
import { ChatMessage, ChatMessageComponent } from '../chat-message/chat-message.component'; 

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent], 
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  encapsulation: ViewEncapsulation.None, 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() messages: ChatMessage[] = []; 
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef<HTMLDivElement>;
  private previousScrollHeight = 0;

  ngAfterViewChecked(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      const currentScrollHeight = el.scrollHeight;
      if (currentScrollHeight > this.previousScrollHeight) {
        this.scrollToBottom();
        this.previousScrollHeight = currentScrollHeight;
      }
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Auto-scroll failed:', err);
    }
  }

  trackByMessageId(index: number, message: ChatMessage): string | number {
    return message.id || index; 
  }
}
