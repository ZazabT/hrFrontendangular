import { Component, computed, signal  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule,  MatToolbarModule , MatButtonModule , MatIconModule , MatSidenavModule , CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private router: Router) {}

  // This method will check if the current route is login or register
  isLoginOrRegisterPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/register';
  }
  close = signal(false);

  sidenavWidth = computed(() => {
    return this.close() ? '65px' : '260px';
  });
}
