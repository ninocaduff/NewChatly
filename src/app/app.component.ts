import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatHistoryComponent } from "./components/chat-history/chat-history.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, ChatBarComponent, ChatHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Chatly';

  fullHistory: string = '';

  messageSubmitted(message: string):  void {
    this.fullHistory += message; // append to the history
  }
}
