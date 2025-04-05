// src/app/services/department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  departments?: T[];
  department?: T;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = 'http://localhost:6969/departments';

  constructor(private http: HttpClient) {}

  // GET all departments
  getAllDepartments(): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(this.baseUrl);
  }

  // GET department by ID
  getDepartmentById(id: number): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new department
  addDepartment(department: Partial<Department>): Observable<ApiResponse<Department>> {
    const payload = { name: department.name, departmentDescription: department.departmentDescription };
    return this.http.post<ApiResponse<Department>>(this.baseUrl, payload);
  }

  // PUT (update) a department by ID
  updateDepartment(id: number, department: Partial<Department>): Observable<ApiResponse<Department>> {
    const payload = { name: department.name, departmentDescription: department.departmentDescription };
    return this.http.put<ApiResponse<Department>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE a department by ID
  deleteDepartment(id: number): Observable<ApiResponse<Department>> {
    return this.http.delete<ApiResponse<Department>>(`${this.baseUrl}/${id}`);
  }
}

