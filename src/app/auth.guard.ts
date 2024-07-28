import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CcServiceService } from './cc-service/cc-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private ccService: CcServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.ccService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Если пользователь авторизован, перенаправляем его на другую страницу (например, на главную)
          this.router.navigate(['/home']); // Замените '/home' на нужный маршрут
          return false; // Запретить доступ к компоненту
        }
        return true; // Разрешить доступ к компоненту
      })
    );
  }
}
