import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly NICKNAME_KEY = 'user_nickname';

  constructor() {}

  saveNickname(nickname: string): void {
    localStorage.setItem(this.NICKNAME_KEY, nickname);
  }

  getNickname(): string {
    return localStorage.getItem(this.NICKNAME_KEY) || '';
  }
}
