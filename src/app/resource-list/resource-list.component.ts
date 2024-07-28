import { Component } from '@angular/core';
import { CcServiceService } from '../cc-service/cc-service.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.scss'
})
export class ResourceListComponent {
  constructor(private ccService: CcServiceService) {}
  resources: any[] = [];
  ngOnInit() {
    this.loadResources();
  }

  loadResources() {
    this.ccService.getResources().then(resource => {
      this.resources = resource.data; // Предполагаем, что данные находятся в поле 'data'
    })
  }

}