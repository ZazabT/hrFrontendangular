import { Component } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import {MatTableModule} from '@angular/material/table';
import { Department } from '../../models/department.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-departments',
  imports: [MatTableModule, CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  

  constructor( private departmentService: DepartmentService) {}

  displayedColumns: string[] = ['id', 'name', 'departmentDescription', 'createdAt'];
  dataSource: Department[] = [];
  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe({
      next: (response: any) => {
        // Assuming your API returns {departments: [...], count: number, message: string}
        this.dataSource = response.departments;
        console.log('Departments:', this.dataSource);
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
}
