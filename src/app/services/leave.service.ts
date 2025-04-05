// src/app/services/leave.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  leaves?: T[];
  leave?: T;
}

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private baseUrl = 'http://localhost:6969/leaves';

  constructor(private http: HttpClient) {}

  // GET all leaves
  getAllLeaves(): Observable<ApiResponse<Leave>> {
    return this.http.get<ApiResponse<Leave>>(this.baseUrl);
  }

  // GET leave by ID
  getLeaveById(id: number): Observable<ApiResponse<Leave>> {
    return this.http.get<ApiResponse<Leave>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new leave
  addLeave(leave: Partial<Leave>): Observable<ApiResponse<Leave>> {
    const payload = {
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate,
      leaveType: leave.leaveType,
      reason: leave.reason,
    };
    return this.http.post<ApiResponse<Leave>>(this.baseUrl, payload);
  }

  // PUT (update) a leave by ID
  updateLeave(id: number, leave: Partial<Leave>): Observable<ApiResponse<Leave>> {
    const payload = {
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate,
      leaveType: leave.leaveType,
      reason: leave.reason,
    };
    return this.http.put<ApiResponse<Leave>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a leave by ID
  deleteLeave(id: number): Observable<ApiResponse<Leave>> {
    return this.http.delete<ApiResponse<Leave>>(`${this.baseUrl}/${id}`);
  }
}
