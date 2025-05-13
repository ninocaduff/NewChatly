import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ChatBarComponent } from "./components/chat-bar/chat-bar.component";
import { ChatHistoryComponent } from "./components/chat-history/chat-history.component";
import { NicknameDialogComponent } from "./components/nickname-dialog/nickname-dialog.component";
import { ChatMessage } from "./components/chat-message/chat-message.component";
import { UserProfileService } from "./services/user-profile.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ChatBarComponent,
    ChatHistoryComponent,
    NicknameDialogComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None // <== hinzugefügt
})
export class AppComponent implements OnInit {
  title = "Chatly";
  messages: ChatMessage[] = [];
  nickname: string = "";
  showNicknameDialog: boolean = true;
  private pollingInterval: any;

  constructor(
    private userProfileService: UserProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    this.nickname = this.userProfileService.getNickname();
    this.showNicknameDialog = !this.nickname;
    if (this.nickname) {
      this.startPolling();
    }
  }

  fetchChatHistory(): void {
    this.http
      .get<any[]>("https://chatlyhsg.onrender.com/api/messages")
      .subscribe({
        next: (apiMessages) => {
          this.messages = apiMessages
            .map((msg) => {
              const messageDate = new Date(msg.time);
              const timeStr = msg.time
                ? messageDate.toLocaleString("de", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "";
              const ariaMessage = String(msg.message).replace(/<[^>]*>/g, "");
              return {
                id: msg._id || msg.id,
                username: msg.username,
                message: msg.message,
                time: timeStr,
                rawDate: messageDate,
                ariaLabel: `Nachricht von ${msg.username}: ${ariaMessage}, gesendet am ${timeStr}`,
              } as ChatMessage;
            })
            .sort(
              (a, b) =>
                (a.rawDate?.getTime() || 0) - (b.rawDate?.getTime() || 0)
            );
        },
        error: (error) => {
          console.error("Error fetching chat history:", error);
          this.messages = [];
        },
      });
  }
  

  messageSubmitted(messageText: string): void {
    if (!messageText.trim()) return;
    this.http
      .post("https://chatlyhsg.onrender.com/api/messages", {
        username: this.nickname,
        message: messageText,
      })
      .subscribe({
        next: () => {
          this.fetchChatHistory();
        },
        error: (error) => {
          console.error("Error sending message:", error);
        },
      });
  }

  private startPolling(): void {
    this.fetchChatHistory();
    if (this.pollingInterval) clearInterval(this.pollingInterval);
    this.pollingInterval = setInterval(() => this.fetchChatHistory(), 5000);
  }

  setNickname(nickname: string): void {
    this.nickname = nickname;
    this.userProfileService.saveNickname(nickname);
    this.showNicknameDialog = false;
    this.startPolling();
  }
}
