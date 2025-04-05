// src/app/services/job-listing.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobListing } from '../models/job-listing.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  jobListings?: T[];
  jobListing?: T;
}

@Injectable({
  providedIn: 'root',
})
export class JobListingService {
  private baseUrl = 'http://localhost:6969/jobListings';

  constructor(private http: HttpClient) {}

  // GET all job listings
  getAllJobListings(): Observable<ApiResponse<JobListing>> {
    return this.http.get<ApiResponse<JobListing>>(this.baseUrl);
  }

  // GET job listing by ID
  getJobListingById(id: number): Observable<ApiResponse<JobListing>> {
    return this.http.get<ApiResponse<JobListing>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new job listing
  addJobListing(jobListing: Partial<JobListing>): Observable<ApiResponse<JobListing>> {
    const payload = {
      jobPositionId: jobListing.jobPositionId,
      jobTitle: jobListing.jobTitle,
      jobRequirements: jobListing.jobRequirements,
      postedDate: jobListing.postedDate,
      deadlineDate: jobListing.deadlineDate,
      status: jobListing.status,
    };
    return this.http.post<ApiResponse<JobListing>>(this.baseUrl, payload);
  }

  // PUT (update) a job listing by ID
  updateJobListing(id: number, jobListing: Partial<JobListing>): Observable<ApiResponse<JobListing>> {
    const payload = {
      jobPositionId: jobListing.jobPositionId,
      jobTitle: jobListing.jobTitle,
      jobRequirements: jobListing.jobRequirements,
      postedDate: jobListing.postedDate,
      deadlineDate: jobListing.deadlineDate,
      status: jobListing.status,
    };
    return this.http.put<ApiResponse<JobListing>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a job listing by ID
  deleteJobListing(id: number): Observable<ApiResponse<JobListing>> {
    return this.http.delete<ApiResponse<JobListing>>(`${this.baseUrl}/${id}`);
  }
}
