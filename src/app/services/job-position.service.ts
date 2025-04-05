// src/app/services/job-position.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobPosition } from '../models/job-position.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  jobPositions?: T[];
  jobPosition?: T;
}

@Injectable({
  providedIn: 'root',
})
export class JobPositionService {
  private baseUrl = 'http://localhost:6969/jobpositions';

  constructor(private http: HttpClient) {}

  // GET all job positions
  getAllJobPositions(): Observable<ApiResponse<JobPosition>> {
    return this.http.get<ApiResponse<JobPosition>>(this.baseUrl);
  }

  // GET job position by ID
  getJobPositionById(id: number): Observable<ApiResponse<JobPosition>> {
    return this.http.get<ApiResponse<JobPosition>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new job position
  addJobPosition(jobPosition: Partial<JobPosition>): Observable<ApiResponse<JobPosition>> {
    const payload = {
      jobTitle: jobPosition.jobTitle,
      jobDescription: jobPosition.jobDescription,
      minSalary: jobPosition.minSalary,
      maxSalary: jobPosition.maxSalary,
      departmentId: jobPosition.departmentId,
    };
    return this.http.post<ApiResponse<JobPosition>>(this.baseUrl, payload);
  }

  // PUT (update) a job position by ID
  updateJobPosition(id: number, jobPosition: Partial<JobPosition>): Observable<ApiResponse<JobPosition>> {
    const payload = {
      jobTitle: jobPosition.jobTitle,
      jobDescription: jobPosition.jobDescription,
      minSalary: jobPosition.minSalary,
      maxSalary: jobPosition.maxSalary,
      departmentId: jobPosition.departmentId,
    };
    return this.http.put<ApiResponse<JobPosition>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a job position by ID
  deleteJobPosition(id: number): Observable<ApiResponse<JobPosition>> {
    return this.http.delete<ApiResponse<JobPosition>>(`${this.baseUrl}/${id}`);
  }
}
