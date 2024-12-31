import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes), provideAnimationsAsync()],
}).catch((err) => console.error(err));
