import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatHistoryComponent } from "./components/chat-history/chat-history.component";
import { UserProfileService } from './services/user-profile.service'; // Neuer Service
import { NicknameDialogComponent } from './components/nickname-dialog/nickname-dialog.component'; // Neue Komponente
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent, NicknameDialogComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Chatly';
  fullHistory: string = '';
  nickname: string = '';
  showNicknameDialog: boolean = true;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    // Versuche, den gespeicherten Nickname zu laden
    this.nickname = this.userProfileService.getNickname();
    this.showNicknameDialog = !this.nickname;
  }

  messageSubmitted(message: string): void {
    // Füge den Nickname zu jeder Nachricht hinzu
    const formattedMessage = this.formatMessageWithNickname(message);
    this.fullHistory += formattedMessage;
  }

  /**
   * Formatiert die Nachricht mit dem Nickname
   * Der Nickname wird nur am Anfang jeder Nachricht (nicht jeder Zeile) angezeigt
   * @param message Die zu formatierende Nachricht
   * @returns Formatierte Nachricht mit Nickname
   */
  private formatMessageWithNickname(message: string): string {
    // Extrahiere Zeit und Inhalt aus der Nachricht
    const timeMatch = message.match(/<b>(.*?)<\/b> - (.*?)<br>/);
    if (!timeMatch || timeMatch.length < 3) return message;
    
    const time = timeMatch[1];
    const content = timeMatch[2];
    
    // Verarbeite mehrzeilige Nachrichten
    // Ersetze \n mit <br> für korrekte HTML-Darstellung
    const formattedContent = content.replace(/\n/g, '<br>');
    
    // Formatiere die Nachricht mit Nickname
    return `  <div class="container my-2">
  <div class="d-flex flex-column bg-light p-2 rounded">
    <div class="d-flex justify-content-between">
      <small class="text-primary" title="${this.nickname}">${this.nickname}</small>
      <small class="text-muted">${time}</small>
    </div>
    <div class="mt-1">
      <span>${formattedContent}</span>
    </div>
  </div>
</div>`;
  }
  
  setNickname(nickname: string): void {
    this.nickname = nickname;
    this.userProfileService.saveNickname(nickname);
    this.showNicknameDialog = false;
  }
}

