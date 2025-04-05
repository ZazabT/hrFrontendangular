import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor
import { MatIconModule } from '@angular/material/icon'; // For mat-icon
import { MatListModule } from '@angular/material/list'; // For mat-list-item
import { RouterLink } from '@angular/router'; // For routerLink

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule,      
    MatIconModule,    
    MatListModule,     
    RouterLink         
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css' 
})
export class CustomSidenavComponent {
  sideNavClose = signal(false);
  @Input() set close(value: boolean) {
    this.sideNavClose.set(value);
  }

  pictureSize = computed(() => this.sideNavClose() ? '32' : '100');
  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', icon: 'dashboard', route: '/' },
    { label: 'Employees', icon: 'people', route: '/employees' },
    { label: 'Departments', icon: 'business', route: '/departments' },
    { label: 'Salaries', icon: 'attach_money', route: '/salaries' },
    { label: 'Positions', icon: 'work', route: '/positions' },
    { label: 'Leaves', icon: 'event_busy', route: '/leaves' },
    { label: 'JobsList', icon: 'assignment', route: '/listings' },
    { label: 'Candidates', icon: 'person_search', route: '/candidates' },
  
  ]);
}