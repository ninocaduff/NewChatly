import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChatMessage,
  ChatMessageComponent,
} from '../chat-message/chat-message.component';
import gsap from 'gsap';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatHistoryComponent implements AfterViewChecked {
  @Input() messages: ChatMessage[] = [];
  @Input() isTyping: boolean = false;
  @Input() typingUser: string = '';

  @ViewChildren('messageEntry')
  messageElements!: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef<HTMLDivElement>;

  private previousScrollHeight = 0;
  private hasAnimatedOnce = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      const currentScrollHeight = el.scrollHeight;

      if (currentScrollHeight > this.previousScrollHeight) {
        if (this.hasAnimatedOnce) {
          this.animateNewMessages();
        }
        this.scrollToBottom();
        this.previousScrollHeight = currentScrollHeight;
        this.hasAnimatedOnce = true;
      }

      // 👇 force update for OnPush strategy when messages come from WebSocket
      this.cdr.markForCheck();
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Auto-scroll failed:', err);
    }
  }

  trackByMessageId(index: number, message: ChatMessage): string | number {
    return message.id || index;
  }

  private animateNewMessages(): void {
    const last = this.messageElements.last;
    if (last) {
      gsap.from(last.nativeElement, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }
}
