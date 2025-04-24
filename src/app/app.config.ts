import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
  provideToastr({timeOut: 4000, closeButton: true, progressBar: true, positionClass: 'toast-bottom-left',preventDuplicates: true}),
  ]
};
