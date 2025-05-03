import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ FormsModule importieren

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(FormsModule) // ✅ FormsModule verfügbar machen
  ]
};
