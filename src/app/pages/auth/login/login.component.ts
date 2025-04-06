import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-login',
  imports: [MatInputModule , FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Validate input fields
    if (!this.email ||!this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // On successful login, save the access token
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/dashboard']); // Navigate to a dashbord route
        // Clear input fields
        this.email = '';
        this.password = '';
      },
      (error) => {
        this.errorMessage = error.error.message; // Handle error response
        console.error(error); // Log error for debugging purposes
      }
    );
  }
}
