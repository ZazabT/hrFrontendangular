import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../../services/auth/auth.service'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-register',
  imports: [MatInputModule , FormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService , private router : Router) { }

  // register
  register() {
      console.log('register called');
      // console input
      console.log('name: ', this.name);
      console.log('email: ', this.email);
      console.log('password: ', this.password);
      // Validate input fields
      if (!this.email ||!this.password || !this.name) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
      
      this.authService.register(this.name, this.email, this.password).subscribe((response)=>{
      // On successful register, save the data to the database and redirect to login page
      this.router.navigate(['/login']); // Navigate to a protected route
      }, (err)=>{
        this.errorMessage = err.error.message; 
        console.error(err); // Log error for debugging purposes
      } );
  }

}
