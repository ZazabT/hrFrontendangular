import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
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
    MatSnackBarModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements AfterViewInit {
  employeesColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'hireDate', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isModalOpen = false;
  firstName:string = '';
  lastName:string = '';
  email:string = '';
  phone:string = '';
  address:string = '';
  hireDate:Date | string | null = null; 
  birthDate:Date | string | null = null; 
  
  isLoading = false;
  

  constructor(private employeesService: EmployeesService , private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Employee>([]);
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees() {
    this.employeesService.getAllEmployees().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.employees; // Assign data to dataSource
        console.log('Employees:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
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

 // Add employee
   addEmployee() {
     console.log('Employee Added');
     console.log('firstname:', this.firstName);
     console.log('lastname:', this.lastName);
     console.log('email:', this.email);
     console.log('phone:', this.phone);
     console.log('address:', this.address);
     console.log('Hiredate:', this.hireDate )
     console.log('BithDate:',this.birthDate)
     const newDepartment: Partial<Employee> = {
       firstName: this.firstName,
       lastName: this.lastName,
       email: this.email,
       phone: this.phone,
       address: this.address,
       hireDate: this.hireDate,
       birthDate:this.birthDate,
     };
 
     this.isLoading = true;
 
     this.employeesService.addEmployee(newDepartment).subscribe({
       next: (response) => {
         console.log('Employee Added Successfully:', response.employee);
         this.snackBar.open('Employee Added successfully!', 'Close', {
           duration: 3000,
           horizontalPosition: 'center',  
           verticalPosition: 'top', 
           panelClass: ['snack-bar-success']
         });
         this.closeModal();
         this.loadEmployees(); 
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
 
  //  // Delete department
  //  deleteDepartment(departmentId: number) {
  //    console.log('Department Deleted');
  //    if (confirm('Are you sure you want to delete this department?')) {
  //      this.isLoading = true;
  //      this.employeesService.deleteEmployee(departmentId).subscribe({
  //        next: (response) => {
  //          console.log('Department Deleted Successfully:', response.message);
  //          this.snackBar.open('Department deleted successfully!', 'Close', {
  //            duration: 3000,
  //            horizontalPosition: 'center',  
  //            verticalPosition: 'top', 
  //            panelClass: ['snack-bar-success']      
  //          });
  //          this.loadEmployees(); 
  //        },
  //        error: (error) => {
  //          console.error('Error deleting department:', error);
  //          this.snackBar.open('Error deleting department'+ error, 'Close', {
  //            duration: 3000,
  //            horizontalPosition: 'center',  
  //            verticalPosition: 'top', 
  //           });
  //          this.isLoading = false;
  //        },
  //        complete: () => {
  //          this.isLoading = false;
  //        },
  //      });
  //    }
  //  }
}