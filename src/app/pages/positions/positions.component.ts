import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobPositionService } from '../../services/job-position.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JobPosition } from '../../models/job-position.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-positions',
  standalone: true,
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
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent implements AfterViewInit{


  displayedColumns: string[] = ['id', 'jobTitle', 'jobDescription', 'minSalary', 'maxSalary', 'departmentId', 'createdAt' , 'actions'];
  dataSource: MatTableDataSource<JobPosition>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isModalOpen = false;

  constructor(private jobPositionService: JobPositionService) {
    this.dataSource = new MatTableDataSource<JobPosition>([]);
  }

  ngOnInit() {
    this.loadPosition();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadPosition(){
    this.jobPositionService.getAllJobPositions().subscribe({
      next: (response: any) => {
        this.dataSource = response.jobPositions;
        console.log('Job Positions:', this.dataSource);
      },
      error: (error) => {
        console.error('Error fetching job positions:', error);
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

  addPositon() {
    console.log('JobPosition Added');
    this.closeModal();
    this.loadPosition();
  }
}
