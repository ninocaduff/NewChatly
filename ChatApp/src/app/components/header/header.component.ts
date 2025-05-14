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
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.currentTheme = newTheme;
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const duration = 0.4;
    const ease = 'power1.out';

    // Helper function to animate elements
    const animateElements = (selector: string, properties: any) => {
      const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      elements.forEach(element => {
        gsap.fromTo(
          element,
          {
            ...properties.from,
          },
          {
            ...properties.to,
            duration,
            ease,
            onComplete: () => {
              Object.keys(properties.from).forEach(prop => element.style.removeProperty(prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)));
            }
          }
        );
      });
    };

    // 1. Global Styles (html, body, a)
    gsap.fromTo(
      document.documentElement, // Targets <html>
      {
        backgroundColor: currentTheme === 'dark' ? '#0c0d0e' : '#e9ecef', // Assuming #e9ecef for light html background
        color: currentTheme === 'dark' ? '#e4e6eb' : '#212529',
      },
      {
        backgroundColor: newTheme === 'dark' ? '#0c0d0e' : '#e9ecef',
        color: newTheme === 'dark' ? '#e4e6eb' : '#212529',
        duration,
        ease,
        onComplete: () => {
          document.documentElement.style.removeProperty('background-color');
          document.documentElement.style.removeProperty('color');
        }
      }
    );

    gsap.fromTo(
      document.body,
      {
        backgroundColor: currentTheme === 'dark' ? '#0c0d0e' : '#e9ecef',
        color: currentTheme === 'dark' ? '#e4e6eb' : '#212529',
      },
      {
        backgroundColor: newTheme === 'dark' ? '#0c0d0e' : '#e9ecef',
        color: newTheme === 'dark' ? '#e4e6eb' : '#212529',
        duration,
        ease,
        onComplete: () => {
          document.body.style.removeProperty('background-color');
          document.body.style.removeProperty('color');
        }
      }
    );

    animateElements('a', {
      from: { color: currentTheme === 'dark' ? '#4caf50' : '#00802f' }, // var(--hsg-green-darkmode) vs var(--hsg-green)
      to: { color: newTheme === 'dark' ? '#4caf50' : '#00802f' },
    });

    // 2. Header Component
    animateElements('.header', {
      from: { backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa' },
      to: { backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#f8f9fa' },
    });

    animateElements('.theme-toggle-button', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: currentTheme === 'dark' ? '#f1f1f1' : '#333',
        borderColor: currentTheme === 'dark' ? '#444' : '#ccc',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: newTheme === 'dark' ? '#f1f1f1' : '#333',
        borderColor: newTheme === 'dark' ? '#444' : '#ccc',
      },
    });

    animateElements('.divider', {
      from: { backgroundColor: currentTheme === 'dark' ? '#444' : '#ccc' },
      to: { backgroundColor: newTheme === 'dark' ? '#444' : '#ccc' },
    });

    // 3. Chat Message Component
    animateElements('.message-bubble:not(.align-right .message-bubble)', { // Received messages
      from: {
        backgroundColor: currentTheme === 'dark' ? '#222529' : '#f8f9fa',
        borderColor: currentTheme === 'dark' ? '#33373b' : '#e9ecef',
        // color for text inside is handled by .message-text
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#222529' : '#f8f9fa',
        borderColor: newTheme === 'dark' ? '#33373b' : '#e9ecef',
      },
    });

    animateElements('.align-right .message-bubble', { // Sent messages
      from: {
        backgroundColor: currentTheme === 'dark' ? '#2a4333' : '#dcf8c6',
        // borderColor could be animated if it differs from general .message-bubble and has specific dark mode
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#2a4333' : '#dcf8c6',
      },
    });

    animateElements('.message-username', {
      from: { color: currentTheme === 'dark' ? '#4caf50' : '#00802f' },
      to: { color: newTheme === 'dark' ? '#4caf50' : '#00802f' },
    });

    animateElements('.message-timestamp', {
      from: { color: currentTheme === 'dark' ? '#98a0a6' : '#6c757d' },
      to: { color: newTheme === 'dark' ? '#98a0a6' : '#6c757d' },
    });

    animateElements('.message-text', {
      from: { color: currentTheme === 'dark' ? '#e8eaed' : '#212529' },
      to: { color: newTheme === 'dark' ? '#e8eaed' : '#212529' },
    });

    // 4. Footer Component
    animateElements('.footer', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        color: currentTheme === 'dark' ? '#b0b3b8' : '#333',
        borderTopColor: currentTheme === 'dark' ? '#2a2b2c' : '#e0e0e0',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        color: newTheme === 'dark' ? '#b0b3b8' : '#333',
        borderTopColor: newTheme === 'dark' ? '#2a2b2c' : '#e0e0e0',
      },
    });

    // 5. Chat History Component
    animateElements('.chat-history-container', {
      from: { backgroundColor: currentTheme === 'dark' ? '#1c1e21' : '#ffffff' },
      to: { backgroundColor: newTheme === 'dark' ? '#1c1e21' : '#ffffff' },
    });

    animateElements('.date-divider span', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#2a2b2c' : '#f0f0f0',
        color: currentTheme === 'dark' ? '#aaa' : '#555',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#2a2b2c' : '#f0f0f0',
        color: newTheme === 'dark' ? '#aaa' : '#555',
      },
    });

    animateElements('.typing-indicator', {
      from: { color: currentTheme === 'dark' ? '#bbb' : '#666' },
      to: { color: newTheme === 'dark' ? '#bbb' : '#666' },
    });

    // 6. Chat Bar Component
    animateElements('.chat-bar-container', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        borderTopColor: currentTheme === 'dark' ? '#2a2b2c' : '#e0e0e0',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#1a1a1a' : '#f8f9fa',
        borderTopColor: newTheme === 'dark' ? '#2a2b2c' : '#e0e0e0',
      },
    });

    animateElements('.chat-input', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#2c2f33' : '#fff',
        color: currentTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: currentTheme === 'dark' ? '#444' : '#ccc',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#2c2f33' : '#fff',
        color: newTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: newTheme === 'dark' ? '#444' : '#ccc',
      },
    });

    animateElements('.send-button', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#0056b3' : '#007bff',
        color: currentTheme === 'dark' ? 'white' : 'white',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#0056b3' : '#007bff',
        color: newTheme === 'dark' ? 'white' : 'white',
      },
    });
    
    animateElements('.send-button:disabled', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#3a3f44' : '#b0c4de',
        color: currentTheme === 'dark' ? '#888' : '#777',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#3a3f44' : '#b0c4de',
        color: newTheme === 'dark' ? '#888' : '#777',
      },
    });

    // 7. Nickname Dialog Component
    animateElements('.dialog-content', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#2c2f33' : '#fff',
        color: currentTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: currentTheme === 'dark' ? '#444' : '#ddd',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#2c2f33' : '#fff',
        color: newTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: newTheme === 'dark' ? '#444' : '#ddd',
      },
    });

    animateElements('.dialog-content input[type="text"]', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#383c40' : '#fff',
        color: currentTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: currentTheme === 'dark' ? '#555' : '#ccc',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#383c40' : '#fff',
        color: newTheme === 'dark' ? '#f0f0f0' : '#333',
        borderColor: newTheme === 'dark' ? '#555' : '#ccc',
      },
    });

    animateElements('.dialog-content button', {
      from: {
        backgroundColor: currentTheme === 'dark' ? '#0056b3' : '#007bff',
        color: currentTheme === 'dark' ? 'white' : 'white',
      },
      to: {
        backgroundColor: newTheme === 'dark' ? '#0056b3' : '#007bff',
        color: newTheme === 'dark' ? 'white' : 'white',
      },
    });

    // Error message color is typically handled by the .dialog-content color or specific CSS, 
    // if it needs separate animation, it can be added here.
    // animateElements('.error-message', { ... });
  }
}
