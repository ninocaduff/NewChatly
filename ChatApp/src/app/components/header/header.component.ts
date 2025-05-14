import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || document.documentElement.getAttribute('data-bs-theme') || 'light';
    this.currentTheme = theme as 'light' | 'dark';
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.currentTheme = newTheme;

    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

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
