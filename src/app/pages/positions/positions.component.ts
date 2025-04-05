import { Component } from '@angular/core';
import { JobPositionService } from '../../services/job-position.service';
import { JobPosition } from '../../models/job-position.model';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-positions',
  imports: [MatTableModule, CommonModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {


  displayedColumns: string[] = ['id', 'jobTitle', 'jobDescription', 'minSalary', 'maxSalary', 'departmentId', 'createdAt'];
  dataSource: JobPosition[] = [];

  constructor (private jobPositionService :JobPositionService ) {}

  ngOnInit(): void {
    this.jobPositionService.getAllJobPositions().subscribe({
      next: (response: any) => {
        // Assuming response has a `jobPositions` array and it's correctly formatted
        this.dataSource = response.jobPositions;
        console.log('Job Positions:', this.dataSource);
      },
      error: (error) => {
        console.error('Error fetching job positions:', error);
      }
    });
  }
}
