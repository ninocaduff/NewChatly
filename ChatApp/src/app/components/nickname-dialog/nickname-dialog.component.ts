import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-nickname-dialog",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./nickname-dialog.component.html",
  styleUrls: ["./nickname-dialog.component.css"],
  encapsulation: ViewEncapsulation.None // hinzugefügt
})
export class NicknameDialogComponent implements AfterViewInit {
  @Output() nicknameSubmitted = new EventEmitter<string>();
  @ViewChild("nicknameInputRef") nicknameInput!: ElementRef<HTMLInputElement>;

  nickname: string = "";
  warningMessage: string = "";

  constructor() {}

  ngAfterViewInit(): void {
    if (this.nicknameInput?.nativeElement) {
      this.nicknameInput.nativeElement.focus();
    }
  }

  onInput(): void {
    this.warningMessage =
      this.nickname.length > 30
        ? "Der Nickname darf maximal 30 Zeichen lang sein."
        : "";
  }

  submitNickname(): void {
    const trimmedNickname = this.nickname.trim();
    if (!trimmedNickname) {
      this.warningMessage = "Bitte gib einen Nickname ein.";
    } else if (trimmedNickname.length > 30) {
      this.warningMessage = "Der Nickname darf maximal 30 Zeichen lang sein.";
    } else {
      this.nicknameSubmitted.emit(trimmedNickname);
      this.warningMessage = "";
    }
  }
}
