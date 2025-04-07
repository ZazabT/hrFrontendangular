import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../models/department.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'departmentDescription', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Department>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isModalOpen = false;

  departmentName: string = '';

  departmentDescription: string = '';
  constructor(private departmentService: DepartmentService) {
    this.dataSource = new MatTableDataSource<Department>([]);
  }

  ngOnInit() {
    this.loadDepartments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.departments;
        console.log('Departments:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addDepartment() {
    console.log('Department Added');
    this.closeModal();
    this.loadDepartments();
  }
}