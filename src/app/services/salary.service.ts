// src/app/services/salary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary } from '../models/salary.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  salaries?: T[];
  salary?: T;
}

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private baseUrl = 'http://localhost:6969/salaries';

  constructor(private http: HttpClient) {}

  // GET all salaries
  getAllSalaries(): Observable<ApiResponse<Salary>> {
    return this.http.get<ApiResponse<Salary>>(this.baseUrl);
  }

  // GET salary by ID
  getSalaryById(id: number): Observable<ApiResponse<Salary>> {
    return this.http.get<ApiResponse<Salary>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new salary
  addSalary(salary: Partial<Salary>): Observable<ApiResponse<Salary>> {
    const payload = {
      employeeId: salary.employeeId,
      amount: salary.amount,
      date: salary.date,
    };
    return this.http.post<ApiResponse<Salary>>(this.baseUrl, payload);
  }

  // PUT (update) a salary by ID
  updateSalary(id: number, salary: Partial<Salary>): Observable<ApiResponse<Salary>> {
    const payload = {
      employeeId: salary.employeeId,
      amount: salary.amount,
      date: salary.date,
    };
    return this.http.put<ApiResponse<Salary>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a salary by ID
  deleteSalary(id: number): Observable<ApiResponse<Salary>> {
    return this.http.delete<ApiResponse<Salary>>(`${this.baseUrl}/${id}`);
  }
}
