import { Component, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor() {}

  toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // 1. Set the theme first (invisible switch)
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 2. Then animate visible components to new theme
    gsap.fromTo(
      document.body,
      {
        backgroundColor: currentTheme === 'dark' ? '#1c1e21' : '#ffffff',
        color: currentTheme === 'dark' ? '#e8eaed' : '#212529',
      },
      {
        backgroundColor: newTheme === 'dark' ? '#1c1e21' : '#ffffff',
        color: newTheme === 'dark' ? '#e8eaed' : '#212529',
        duration: 0.4,
        ease: 'power1.out',
      }
    );

    gsap.fromTo(
      '.header',
      {
        backgroundColor: currentTheme === 'dark' ? '#1c1e21' : '#ffffff',
      },
      {
        backgroundColor: newTheme === 'dark' ? '#1c1e21' : '#ffffff',
        duration: 0.4,
        ease: 'power1.out',
      }
    );
  }
}
