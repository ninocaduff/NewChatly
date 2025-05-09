import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms'; // für [(ngModel)]

@Component({
  selector: 'app-nickname-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nickname-dialog.component.html',
  styleUrls: ['./nickname-dialog.component.css'],
  encapsulation: ViewEncapsulation.None // <–– hinzugefügt
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