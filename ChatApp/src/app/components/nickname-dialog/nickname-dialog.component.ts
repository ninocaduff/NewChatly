import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nickname-dialog',
  imports: [FormsModule],
  standalone: true,
  template: `
    <div class="nickname-dialog-overlay">
      <div class="nickname-dialog">
        <h2>Willkommen bei Chatly!</h2>
        <p>Bitte gib deinen Nickname ein, um zu chatten.</p>
        <div class="form-group">
          <input 
            type="text" 
            class="form-control chat-textarea pe-5"
            [(ngModel)]="nickname"
            placeholder="Dein Nickname"
            (keydown.enter)="submitNickname()"
          >
        </div>
        <button 
          class="btn btn-success chat-send-button mt-3" 
          [disabled]="!nickname.trim()" 
          (click)="submitNickname()">
          Starten
        </button>
      </div>
    </div>
  `,
  styles: [`
    .nickname-dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .nickname-dialog {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      text-align: center;
    }
    .form-group {
      margin: 20px 0;
    }
  `]
})
export class NicknameDialogComponent {
  @Output() nicknameSubmitted = new EventEmitter<string>();
  nickname: string = '';
  
  submitNickname(): void {
    if (this.nickname.trim()) {
      this.nicknameSubmitted.emit(this.nickname.trim());
    }
  }
}
