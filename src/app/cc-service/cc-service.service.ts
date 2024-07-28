import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CcServiceService {
  _API = 'https://reqres.in/api';
  isAuthenticated: boolean = false;

  checkCookie = (name: string) => {
    const value = document.cookie;
    console.log('Все куки:', value); 
    const parts = value.split('; ').find(part => part.startsWith(`${name}=`));
  
    if (parts) {
      const tokenValue = parts.split('=')[1]; 
      console.log('Значение токена:', tokenValue); 
  
      this.isAuthenticatedSubject.next(true); 
      return true;
    } else {
      this.isAuthenticatedSubject.next(false); 
      return false;
    }
  }
  
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  fetchResource = async (endpoint: string) => {
    try {
      let response = await fetch(`${this._API}${endpoint}`);
      if (response.ok) {
        let resources = await response.json();
        console.log(resources);
        return resources; 
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
    } catch (error) {
      console.error("Произошла ошибка при выполнении запроса:", error);
    }
  }

  getUsers = async () => {
    return this.fetchResource('/users?&page=2');
  }

  getResources = async () => {
    
    return this.fetchResource('/unknown');
  }

  getUser = async (id: number) => {
    return this.fetchResource(`/users/${id}`);
  }

  updateUser = async (id: number, userData: object) => {
    try {
      let response = await fetch(`${this._API}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        let updatedUser = await response.json();
        console.log('Пользователь обновлен:', updatedUser);
        return updatedUser;
      } else {
        console.error("Ошибка HTTP при обновлении пользователя:", response.status);
      }
    } catch (error) {
      console.error("Произошла ошибка при обновлении пользователя:", error);
    }
  }

  deleteUser = async (id: number) => {
    try {
        let response = await fetch(`${this._API}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`Пользователь с ID ${id} успешно удален.`);
            return true; 
        } else {
            console.error("Ошибка HTTP при удалении пользователя:", response.status);
            return false; 
        }
    } catch (error) {
        console.error("Произошла ошибка при удалении пользователя:", error);
        return false; 
    }
}
login = async (email: string, password: string) => {
  try {
    let response = await fetch(`${this._API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password }),
    });
    
    if (response.ok) {
      let data = await response.json();
      this.setSession(data.token); // Устанавливаем сессию с токеном
      this.isAuthenticated = true; // Устанавливаем состояние аутентификации
      console.log(this.isAuthenticated)
      return data.token; // Возвращаем токен
    } else {
      console.error("Ошибка HTTP при входе:", response.status);
      return null; // Возвращаем null в случае ошибки
    }
  } catch (error) {
    console.error("Произошла ошибка при входе:", error);
    return null; // Возвращаем null в случае исключения
  }
}

register = async (email: string, password: string) => {
  try {
    let response = await fetch(`${this._API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password }),
    });

    if (response.ok) {
      let data = await response.json();
      this.setSession(data.token); // Устанавливаем сессию с токеном
      this.isAuthenticated = true; // Устанавливаем состояние аутентификации
      return data.token; // Возвращаем токен
    } else {
      console.error("Ошибка HTTP при регистрации:", response.status);
      return null; // Возвращаем null в случае ошибки
    }
  } catch (error) {
    console.error("Произошла ошибка при регистрации:", error);
    return null; // Возвращаем null в случае исключения
  }
}

private setSession(token: string) {
  let expires:any = new Date(Date.now() + 60 * 1000); // Устанавливаем время жизни куки на одну минуту
  document.cookie = `token=${token}`; 
  expires=`${expires.toUTCString()}; path=/`; // Устанавливаем куку
  this.isAuthenticatedSubject.next(true);
}

checkSession = () => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  this.isAuthenticated = !!tokenCookie; 
  return this.isAuthenticated;
}

logout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
  this.isAuthenticated = false; 
  this.isAuthenticatedSubject.next(false);
}
}