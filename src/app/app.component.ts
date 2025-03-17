import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from "./components/footer/footer.component";
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, ChatBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatApp';
}
