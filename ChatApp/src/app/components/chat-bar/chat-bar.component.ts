import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"; // für *ngIf

@Component({
  selector: "app-chat-bar",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./chat-bar.component.html",
  styleUrls: ["./chat-bar.component.css"],
})
export class ChatBarComponent implements AfterViewInit {
  @Output() submitMessage = new EventEmitter<string>();
  @ViewChild("chatInput") chatInput!: ElementRef<HTMLTextAreaElement>;

  chatMessage: string = "";
  warningMessage: string = "";

  constructor() {}

  ngAfterViewInit(): void {
    this.focusInput();
  }

  focusInput(): void {
    if (this.chatInput && this.chatInput.nativeElement) {
      this.chatInput.nativeElement.focus();
    }
  }

  onInput(): void {
    if (this.chatMessage.length > 500) {
      this.warningMessage = "Die Nachricht darf maximal 500 Zeichen lang sein.";
    } else {
      this.warningMessage = "";
    }
  }

  addMessage(message: string): void {
    const trimmed = message.trim();
    if (trimmed.length === 0) return;

    if (trimmed.length > 500) {
      this.warningMessage = "Die Nachricht darf maximal 500 Zeichen lang sein.";
      return;
    }
    this.warningMessage = "";

    this.submitMessage.emit(trimmed); 
    this.chatMessage = "";
    this.focusInput();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const trimmed = this.chatMessage.trim();
      if (trimmed.length === 0) return;
      this.addMessage(trimmed);
    }
  }
}
