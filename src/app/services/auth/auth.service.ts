import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:6969';

  constructor( private http: HttpClient ) { }

    // Method to register
    register(name: string, email: string, password: string): Observable<any> {
      console.log('register service', name, email, password);
      return this.http.post(`${this.baseUrl}/auth/register`, { name, email, password });
    }

    // Method to login
    login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
    }

    // Method to refresh the access token
    refreshAccessToken(): Observable<any> {
      return this.http.post(`${this.baseUrl}/auth/refresh-token`, {}, { withCredentials: true });
    }

    // Method to logout
    logout(): Observable<any> {
      return this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true });
    }

}
