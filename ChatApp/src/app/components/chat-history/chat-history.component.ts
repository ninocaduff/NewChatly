import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() history: string = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked(): void {
    const el = this.scrollContainer.nativeElement;
    const isNearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
  
    if (isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Auto-scroll failed:', err);
    }
  }
}
