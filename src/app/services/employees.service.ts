import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

// Define API response interface outside the class
export interface ApiResponse<T> {
  message: string;
  count?: number;
  employees?: T[]; // Array of employees for the 'GET all' request
  employee?: T; // Single employee for 'GET by ID', 'POST', 'PUT', or 'DELETE'
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl = 'http://localhost:6969/employees';

  constructor(private http: HttpClient) {}

  // GET all Employees
  getAllEmployees(): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(this.baseUrl);
  }

  // GET Employee by ID
  getEmployeeById(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`${this.baseUrl}/${id}`);
  }

  // POST (add) a new Employee
  addEmployee(employee: Partial<Employee>): Observable<ApiResponse<Employee>> {
    const payload = {
      first_name: employee.firstName,
      last_name: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      birthDate: employee.birthDate,
      hireDate: employee.hireDate,
      jobPositionId: employee.jobPositionId,
      createdAt: employee.createdAt
    };
    return this.http.post<ApiResponse<Employee>>(this.baseUrl, payload);
  }

  // PUT (update) an Employee by ID
  updateEmployee(id: number, employee: Partial<Employee>): Observable<ApiResponse<Employee>> {
    const payload = {
      first_name: employee.firstName,
      last_name: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      birthDate: employee.birthDate,
      hireDate: employee.hireDate,
      jobPositionId: employee.jobPositionId,
      createdAt: employee.createdAt
    };
    return this.http.put<ApiResponse<Employee>>(`${this.baseUrl}/${id}`, payload);
  }

  // DELETE an Employee by ID
  deleteEmployee(id: number): Observable<ApiResponse<Employee>> {
    return this.http.delete<ApiResponse<Employee>>(`${this.baseUrl}/${id}`);
  }
}
