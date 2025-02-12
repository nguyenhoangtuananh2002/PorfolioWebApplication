import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Import your routes configuration
import { authInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),  
    provideRouter(routes),  // Add the routing provider
  ]
}).catch(err => console.error(err));
