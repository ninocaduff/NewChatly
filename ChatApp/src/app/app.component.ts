import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { NicknameDialogComponent } from './components/nickname-dialog/nickname-dialog.component';
import { ChatMessage } from './components/chat-message/chat-message.component';
import { UserProfileService } from './services/user-profile.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChatBarComponent,
    ChatHistoryComponent,
    NicknameDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Chatly';
  messages: ChatMessage[] = [];
  nickname: string = '';
  showNicknameDialog: boolean = true;
  nicknameError: string = '';

  isTyping = false;
  typingUser = '';

  private typingTimeout: any = null;

  constructor(
    private userProfileService: UserProfileService,
    private http: HttpClient,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    this.nickname = this.userProfileService.getNickname();
    this.showNicknameDialog = !this.nickname;

    if (this.nickname) {
      this.initializeChat();
    }
  }

  private initializeChat(): void {
    this.fetchChatHistory();

    this.socketService.onMessage().subscribe((msg) => {
      this.messages.push(this.parseMessage(msg));

      // ✅ Clear typing indicator if the sender matches the typing user
      if (msg.username === this.typingUser) {
        this.isTyping = false;
        this.typingUser = '';
        if (this.typingTimeout) {
          clearTimeout(this.typingTimeout);
          this.typingTimeout = null;
        }
      }
    });

    this.socketService.onTyping().subscribe((data: { username: string }) => {
      if (data.username !== this.nickname) {
        this.typingUser = data.username;
        this.isTyping = true;

        // 🧼 Clear old timeout before starting a new one
        if (this.typingTimeout) {
          clearTimeout(this.typingTimeout);
        }

        // 🕐 Hide indicator after 5s if no further typing
        this.typingTimeout = setTimeout(() => {
          this.isTyping = false;
          this.typingUser = '';
        }, 3000);
      }
    });
  }

  fetchChatHistory(): void {
    this.http
      .get<any[]>('https://chatlyhsg.onrender.com/api/messages')
      .subscribe({
        next: (apiMessages) => {
          const today = new Date().toDateString();
          const yesterday = new Date(Date.now() - 86400000).toDateString(); // 24h ago

          this.messages = apiMessages
            .map((msg) => {
              const messageDate = new Date(msg.time);

              const timeStr = msg.time
                ? messageDate.toLocaleTimeString('de', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '';

              const ariaMessage = String(msg.message).replace(/<[^>]*>/g, '');

              // ✅ Compute the date string (Heute, Gestern, etc.)
              const dateString =
                messageDate.toDateString() === today
                  ? 'Heute'
                  : messageDate.toDateString() === yesterday
                  ? 'Gestern'
                  : messageDate.toLocaleDateString('de', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    });

              return {
                id: msg._id || msg.id,
                username: msg.username,
                message: msg.message,
                time: timeStr,
                rawDate: messageDate,
                dateString: dateString, // ✅ Now it's defined correctly
                fromSelf: msg.username === this.nickname,
                ariaLabel: `Nachricht von ${msg.username}: ${ariaMessage}, gesendet am ${timeStr}`,
              } as ChatMessage;
            })
            .sort(
              (a, b) =>
                (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0)
            );
        },
        error: (error) => {
          console.error('Error fetching chat history:', error);
          this.messages = [];
        },
      });
  }

  messageSubmitted(messageText: string): void {
    if (!messageText.trim()) return;

    const msg = {
      username: this.nickname,
      message: messageText,
      timestamp: new Date().toISOString(),
    };

    this.socketService.sendMessage(msg);

    this.isTyping = false;
    this.typingUser = '';
  }

  handleTyping(): void {
    if (this.nickname) {
      this.socketService.sendTyping(this.nickname);
    }
  }

  parseMessage(msg: any): ChatMessage {
    const messageDate = new Date(msg.timestamp);

    const timeStr = messageDate.toLocaleTimeString('de', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const dateString =
      messageDate.toDateString() === today
        ? 'Heute'
        : messageDate.toDateString() === yesterday
        ? 'Gestern'
        : messageDate.toLocaleDateString('de', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });

    return {
      id: msg._id || msg.id,
      username: msg.username,
      message: msg.message,
      time: timeStr,
      rawDate: messageDate,
      dateString: dateString,
      fromSelf: msg.username === this.nickname,
      ariaLabel: `Nachricht von ${msg.username}: ${msg.message}, gesendet am ${timeStr}`,
    };
  }

  setNickname(nickname: string): void {
    this.nicknameError = '';

    this.http
      .post('https://chatlyhsg.onrender.com/api/nickname', {
        username: nickname,
      })
      .subscribe({
        next: () => {
          this.nickname = nickname;
          this.userProfileService.saveNickname(nickname);
          this.showNicknameDialog = false;

          this.initializeChat(); // ✅ centralizes fetch + socket
        },
        error: (err) => {
          if (err.status === 409) {
            this.nicknameError = '❗Dieser Benutzername ist bereits vergeben.';
          } else {
            this.nicknameError =
              '⚠️ Beim Registrieren ist ein Fehler aufgetreten.';
            console.error(err);
          }
        },
      });
  }
}
