import { Component } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-employees',
  imports: [MatTableModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {


    employeesColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'birthDate', 'hireDate', 'jobPositionId', 'createdAt'];        
    employeesDataSource: Employee[] = [];
  constructor(private employeesService: EmployeesService){}

  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (response: any) => {
        this.employeesDataSource = response.employees;
        console.log('Employees:', this.employeesDataSource);
      },
      error: (error) => {
        console.error('Error fetching job positions:', error);
      }
    });
  }
}
