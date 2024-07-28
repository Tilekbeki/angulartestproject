import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Импортируйте созданный guard
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'auth', component: AuthComponent, canActivate: [AuthGuard]}
];


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes), provideClientHydration()]
};
