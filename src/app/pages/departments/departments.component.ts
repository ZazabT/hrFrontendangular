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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    FormsModule,
    MatSnackBarModule
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
  isLoading = false;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Department>([]);
  }

  ngOnInit() {
    this.loadDepartments();
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('Paginator or Sort not initialized');
    }
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.departments;
        console.log('Departments:', this.dataSource.data);
        // Reassign paginator and sort after data is set
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
        this.snackBar.open('Error fetching departments', 'Close', { duration: 3000 });
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

  // Add department
  addDepartment() {
    console.log('Department Added');
    console.log('Name:', this.departmentName);
    console.log('Description:', this.departmentDescription);

    const newDepartment: Partial<Department> = {
      name: this.departmentName,
      departmentDescription: this.departmentDescription,
    };

    this.isLoading = true;

    this.departmentService.addDepartment(newDepartment).subscribe({
      next: (response) => {
        console.log('Department Added Successfully:', response.department);
        this.snackBar.open('Department deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',  
          verticalPosition: 'top', 
          panelClass: ['snack-bar-success']
        });
        this.closeModal();
        this.loadDepartments(); 
      },
      error: (error) => {
        console.error('Error adding department:', error);
        this.snackBar.open('Error adding department' + error, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',  
          verticalPosition: 'top', 
         });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  // Delete department
  deleteDepartment(departmentId: number) {
    console.log('Department Deleted');
    if (confirm('Are you sure you want to delete this department?')) {
      this.isLoading = true;
      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: (response) => {
          console.log('Department Deleted Successfully:', response.message);
          this.snackBar.open('Department deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',  
            verticalPosition: 'top', 
            panelClass: ['snack-bar-success']      
          });
          this.loadDepartments(); 
        },
        error: (error) => {
          console.error('Error deleting department:', error);
          this.snackBar.open('Error deleting department'+ error, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',  
            verticalPosition: 'top', 
           });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
