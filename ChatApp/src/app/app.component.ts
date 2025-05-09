import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatHistoryComponent } from "./components/chat-history/chat-history.component";
import { UserProfileService } from './services/user-profile.service'; 
import { NicknameDialogComponent } from './components/nickname-dialog/nickname-dialog.component';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private userProfileService: UserProfileService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Versuche, den gespeicherten Nickname zu laden
    this.nickname = this.userProfileService.getNickname();
    this.showNicknameDialog = !this.nickname;
    
    if (this.nickname) {
      // Lade den Chat-Verlauf vom Server
      this.startPolling(); // 
    }
  }

  // Neue Methode zum Abrufen des Chat-Verlaufs
  fetchChatHistory(): void {
    this.http.get<any[]>('https://chatlyhsg.onrender.com/api/messages').subscribe({
      next: (messages) => {
        this.fullHistory = '';
        messages.forEach(msg => {
          const time = msg.time
            ? new Date(msg.time).toLocaleTimeString('de', {
                hour: '2-digit',
                minute: '2-digit'
              })
            : '';
            const formattedMsg = `
            <article class="container my-2" role="group" aria-label="${msg.message} von ${msg.username} um ${time}">
              <div class="d-flex flex-column bg-light p-2 rounded">
                <div class="d-flex justify-content-between">
                  <small class="chat-name" title="${msg.username}">${msg.username}</small>
                  <small class="text-muted">${time}</small>
                </div>
                <div class="mt-1">
                  <span class="chat-message-content">${msg.message}</span>
                </div>
              </div>
            </article>`;
          this.fullHistory += formattedMsg;
        });
      },
      error: (error) => {
        console.error('Error fetching chat history:', error);
      }
    });
  }

  messageSubmitted(message: string): void {
    // Extrahiere den Text aus der formatierten Nachricht
    const timeMatch = message.match(/<b>(.*?)<\/b> - (.*?)<br>/);
    if (!timeMatch || timeMatch.length < 3) return;
    
    const messageText = timeMatch[2];
    
    // Sende die Nachricht an die API
    this.http.post('https://chatlyhsg.onrender.com/api/messages', {
      username: this.nickname,
      message: messageText
    }).subscribe({
      next: () => {
        // Nach erfolgreichem Senden den Chat-Verlauf neu laden
        this.fetchChatHistory();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        
        // Zeige die Nachricht lokal an, falls API-Aufruf fehlschlägt
        const formattedMessage = this.formatMessageWithNickname(message);
        this.fullHistory += formattedMessage;
      }
    });
  }


  private pollingInterval: any;

  private startPolling(): void {
  this.fetchChatHistory();
  this.pollingInterval = setInterval(() => this.fetchChatHistory(), 500);
  }

  /**
   * Formatiert die Nachricht mit dem Nickname (für lokale Anzeige)
   */
  private formatMessageWithNickname(message: string): string {
    // Extrahiere Zeit und Inhalt aus der Nachricht
    const timeMatch = message.match(/<b>(.*?)<\/b> - (.*?)<br>/);
    if (!timeMatch || timeMatch.length < 3) return message;
    
    const time = timeMatch[1];
    const content = timeMatch[2];
    
    // Verarbeite mehrzeilige Nachrichten
    const formattedContent = content.replace(/\n/g, '<br>');
    
    // Formatiere die Nachricht mit Nickname
    return `  <div class="container my-2">
  <div class="d-flex flex-column bg-light p-2 rounded">
    <div class="d-flex justify-content-between">
      <small class="chat-name" title="${this.nickname}">${this.nickname}</small>
      <small class="text-muted">${time}</small>
    </div>
    <div class="mt-1">
      <span class="chat-message-content">${formattedContent}</span>
    </div>
  </div>
</div>`;
  }
  
  setNickname(nickname: string): void {
    this.nickname = nickname;
    this.userProfileService.saveNickname(nickname);
    this.showNicknameDialog = false;
    
    // Lade den Chat-Verlauf konstant
    this.startPolling();
  }

}