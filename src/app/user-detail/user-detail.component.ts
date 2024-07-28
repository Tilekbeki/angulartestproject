import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CcServiceService } from '../cc-service/cc-service.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  imports: [AppHeaderComponent, FormsModule, CommonModule],
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: number | null = null;
  
  constructor(private route: ActivatedRoute, private ccService: CcServiceService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Преобразование в число
      this.getUser(); // Вызов метода для получения пользователя
      
    });
  }

  isEditing = false; // Переменная для отслеживания состояния редактирования
  user: any; // Измените тип на нужный, если у вас есть интерфейс для пользователя
  name: string | null = null;
  surname: string | null = null;
  email: string | null = null;
  src: string | null = null;

  // Метод для переключения состояния редактирования
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  getUser() {
    if (this.id !== null) {
      this.ccService.getUser(this.id).then(userData => {
        this.name = userData.data.first_name;
        this.surname = userData.data.last_name;
        this.email = userData.data.email;
        this.src = userData.data.avatar;
      }, error => {
        console.error('Ошибка при получении пользователя:', error);
      });
    }
  }

  updateUser() {
    if (this.id !== null) {
      this.ccService.updateUser(+this.id,{first_name: this.name,second_name:this.surname,email:this.email,avatart:this.src})
      .then(()=>{
        this.isEditing = false;
        console.log(this.name)
      });
    }
    
  }
}
