import { Component, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  currentTheme: 'light' | 'dark' = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';

  toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.currentTheme = newTheme;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    gsap.fromTo(
      document.body,
      {
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        color: currentTheme === 'dark' ? '#e8eaed' : '#212529',
      },
      {
        backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        color: newTheme === 'dark' ? '#e8eaed' : '#212529',
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => {
          document.body.style.removeProperty('background-color');
          document.body.style.removeProperty('color');
        }
      }
    );

    const headerEl = document.querySelector('.header') as HTMLElement;
    if (headerEl) {
      gsap.fromTo(
        headerEl,
        {
          backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        },
        {
          backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
          duration: 0.4,
          ease: 'power1.out',
          onComplete: () => {
            headerEl.style.removeProperty('background-color');
          }
        }
      );
    }

    const dividerEl = document.querySelector('.divider') as HTMLElement;
    if (dividerEl) {
      gsap.fromTo(
        dividerEl,
        {
          backgroundColor: currentTheme === 'dark' ? '#444' : '#ccc',
        },
        {
          backgroundColor: newTheme === 'dark' ? '#444' : '#ccc',
          duration: 0.4,
          ease: 'power1.out',
          onComplete: () => {
            dividerEl.style.removeProperty('background-color');
          }
        }
      );
    }
  }
}
