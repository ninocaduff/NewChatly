import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"; // für *ngIf

@Component({
  selector: "app-nickname-dialog",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./nickname-dialog.component.html",
  styleUrls: ["./nickname-dialog.component.css"],
})
export class NicknameDialogComponent implements AfterViewInit {
  @Output() nicknameSubmitted = new EventEmitter<string>();
  @ViewChild("nicknameInputRef") nicknameInput!: ElementRef<HTMLInputElement>;

  nickname: string = "";
  warningMessage: string = "";

  constructor() {}

  ngAfterViewInit(): void {
    if (this.nicknameInput && this.nicknameInput.nativeElement) {
      this.nicknameInput.nativeElement.focus();
    }
  }

  onInput(): void {
    if (this.nickname.length > 30) {
      this.warningMessage = "Der Nickname darf maximal 30 Zeichen lang sein.";
    } else {
      this.warningMessage = "";
    }
  }

  submitNickname(): void {
    const trimmedNickname = this.nickname.trim();
    if (trimmedNickname && trimmedNickname.length <= 30) {
      this.nicknameSubmitted.emit(trimmedNickname);
      this.warningMessage = "";
    } else if (trimmedNickname.length > 30) {
      this.warningMessage = "Der Nickname darf maximal 30 Zeichen lang sein.";
    } else {
      this.warningMessage = "Bitte gib einen Nickname ein.";
    }
  }
}
