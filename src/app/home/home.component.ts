import { Component } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { ResourceListComponent } from '../resource-list/resource-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppHeaderComponent, UsersListComponent, ResourceListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
