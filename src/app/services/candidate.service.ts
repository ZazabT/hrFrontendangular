// src/app/services/candidate.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  candidates?: T[];
  candidate?: T;
}

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = 'http://localhost:6969/cadidates';

  constructor(private http: HttpClient) {}

  // GET all candidates
  getAllCandidates(): Observable<ApiResponse<Candidate>> {
    return this.http.get<ApiResponse<Candidate>>(this.baseUrl);
  }

  // GET candidate by ID
  getCandidateById(id: number): Observable<ApiResponse<Candidate>> {
    return this.http.get<ApiResponse<Candidate>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new candidate
  addCandidate(candidate: Partial<Candidate>): Observable<ApiResponse<Candidate>> {
    const payload = {
      jobListingId: candidate.jobListingId,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      address: candidate.address,
      coverLetter: candidate.coverLetter,
      applicationDate: candidate.applicationDate,
      status: candidate.status,
    };
    return this.http.post<ApiResponse<Candidate>>(this.baseUrl, payload);
  }

  // PUT (update) a candidate by ID
  updateCandidate(id: number, candidate: Partial<Candidate>): Observable<ApiResponse<Candidate>> {
    const payload = {
      jobListingId: candidate.jobListingId,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      address: candidate.address,
      coverLetter: candidate.coverLetter,
      applicationDate: candidate.applicationDate,
      status: candidate.status,
    };
    return this.http.put<ApiResponse<Candidate>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a candidate by ID
  deleteCandidate(id: number): Observable<ApiResponse<Candidate>> {
    return this.http.delete<ApiResponse<Candidate>>(`${this.baseUrl}/${id}`);
  }
}
