import { AfterViewChecked, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-history',
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  encapsulation: ViewEncapsulation.None // <– hinzugefügt
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() history: string = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  private previousScrollHeight = 0;

  ngAfterViewChecked(): void {
    const el = this.scrollContainer.nativeElement;
    const currentScrollHeight = el.scrollHeight;
  
    if (currentScrollHeight > this.previousScrollHeight) {
      this.scrollToBottom();
      this.previousScrollHeight = currentScrollHeight;
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
