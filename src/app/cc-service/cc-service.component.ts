import { Component } from '@angular/core';

@Component({
  selector: 'app-cc-service',
  standalone: true,
  imports: [],
  templateUrl: './cc-service.component.html',
  styleUrl: './cc-service.component.scss'
})
export class CcServiceComponent {
  _API = 'https://reqres.in/api/';

  fetchResource = async (endpoint: string) => {
    try {
      let response = await fetch(`${this._API}${endpoint}`);
      if (response.ok) {
        let resources = await response.json();
        console.log(resources);
        return resources; // Возвращаем ресурсы, если это необходимо
      } else {
        console.log('sadas')
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении запроса:", error);
    }
  }

  getUsers = async () => {
    this.fetchResource('/users');
  }

  getResources = async () => {
    this.fetchResource('/unknown');
  }

  getUser = (id: number) => {
    this.fetchResource(`/users/${id}`);
  }

  updateUser = async (id: number, userData: object) => {
    try {
      let response = await fetch(`${this._API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Преобразуем данные пользователя в JSON
      });

      if (response.ok) {
        let updatedUser = await response.json();
        console.log('Пользователь обновлен:', updatedUser);
        return updatedUser; // Возвращаем обновленного пользователя
      } else {
        console.error("Ошибка HTTP при обновлении пользователя:", response.status);
      }
    } catch (error) {
      console.error("Произошла ошибка при обновлении пользователя:", error);
    }
  }


}
