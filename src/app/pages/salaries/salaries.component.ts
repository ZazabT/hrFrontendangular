import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SalaryService } from '../../services/salary.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Salary } from '../../models/salary.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-salaries',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './salaries.component.html',
  styleUrl: './salaries.component.css'
})
export class SalariesComponent implements AfterViewInit{
  
  displayedColumns: string[] = ['id', 'amount', 'date', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Salary>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isModalOpen = false;

  constructor(private salaryService: SalaryService) {
    this.dataSource = new MatTableDataSource<Salary>([]);
  }
  
  
  ngOnInit() {
    this.loadSalaries();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSalaries() {
    this.salaryService.getAllSalaries().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.salaries;
        console.log('Salaries:', this.dataSource.data);
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
    this.loadSalaries();
  }

}



















  



  


