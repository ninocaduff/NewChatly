import { Component, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  currentTheme: 'light' | 'dark' =
    document.documentElement.getAttribute('data-bs-theme') === 'dark'
      ? 'dark'
      : 'light';

  toggleTheme(): void {
    const currentTheme =
      document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.currentTheme = newTheme;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Logo-Drehung mit Bildwechsel
    const logo = document.querySelector('.chatlylogo') as HTMLImageElement;
    if (logo) {
      gsap.to(logo, {
        rotateY: 90,
        duration: 0.15,
        ease: 'power1.in',
        onComplete: () => {
          logo.src =
            newTheme === 'dark'
              ? '../../../../chatlylogodark.png'
              : '../../../../chatlylogo.png';
          gsap.fromTo(
            logo,
            { rotateY: -90 },
            {
              rotateY: 0,
              duration: 0.15,
              ease: 'power1.out',
            }
          );
        },
      });
    }
  }
}
