import { Component } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CcServiceService } from '../cc-service/cc-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AppHeaderComponent, FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'] 
})
export class AuthComponent {
  isLogin = true; 
  messageAboutEmail = '';
  messageAboutPasswords = ''; 
  constructor(private ccService: CcServiceService) {}
  loginEmail: string = '';
  loginPassword: string = '';

  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';

  toggleTab(isLogin: boolean) {
    this.isLogin = isLogin; 
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  login() {
    this.messageAboutEmail = '';

    if (!this.isValidEmail(this.loginEmail)) {
      this.messageAboutEmail = '*Некорректный адрес электронной почты!';
      return;
    }
    this.ccService.login(this.loginEmail,this.loginPassword);
  }

  register() {
    this.messageAboutEmail = '';
    this.messageAboutPasswords = '';
    let hasError = false; 

    if (!this.isValidEmail(this.registerEmail)) {
      this.messageAboutEmail = '*Некорректный адрес электронной почты!';
      hasError = true; 
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      this.messageAboutPasswords = '*Пароли не совпадают!';
      hasError = true; 
    }

    if (hasError) {
      return;
    }

    this.ccService.register(this.registerEmail,this.registerPassword);
  }
}
