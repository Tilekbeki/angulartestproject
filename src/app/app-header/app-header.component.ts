import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CcServiceService } from '../cc-service/cc-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  currentUser: string = 'незнакомец';
  isAuthenticated: boolean = false;
  constructor(private ccService: CcServiceService) {}

  ngOnInit() {
    if(this.ccService.checkCookie('token')) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    this.ccService.isAuthenticated$.subscribe(isAuthenticated => {
      this.updateCurrentUser(isAuthenticated);
      
    });
  }

  private updateCurrentUser(isAuthenticated: boolean) {
    if (isAuthenticated) {
      this.currentUser = 'Авторизованный пользователь'; 
    } else {
      this.currentUser = 'незнакомец';
    }
  }

  logout(): void {
    this.ccService.logout(); // Вызываем метод logout из сервиса
    this.isAuthenticated = false; // Обновляем состояние аутентификации
  }
}
