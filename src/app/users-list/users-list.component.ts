import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CcServiceService } from '../cc-service/cc-service.service'; 
import { RouterLink } from '@angular/router';
@Component({
  selector: 'users-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: any[] =  [];

  constructor(private ccService: CcServiceService) {}
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.ccService.getUsers().then(users => {
      this.users = users.data; // Предполагаем, что данные находятся в поле 'data'
    })
  }

  // updateUser() {
  //   const userId = 1; // ID пользователя для обновления
  //   const userData = { name: "John Doe", job: "Developer" };
    
  //   this.ccService.updateUser(userId, userData).then(updatedUser => {
  //     console.log(updatedUser);
  //   });
  // }

  deleteUser(id: number) {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      this.ccService.deleteUser(id).then(response => {
        // Удаляем пользователя из массива
        this.users = this.users.filter(user => user.id !== id);
      }, error => {
        console.error('Ошибка при удалении пользователя:', error);
      });
    }
  }
}