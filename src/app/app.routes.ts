import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { SalariesComponent } from './pages/salaries/salaries.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Routes with canActivate guard to protect access
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'salaries', component: SalariesComponent, canActivate: [AuthGuard] },
  { path: 'positions', component: PositionsComponent, canActivate: [AuthGuard] },
  { path: 'leaves', component: LeavesComponent, canActivate: [AuthGuard] },
  { path: 'listings', component: ListingsComponent, canActivate: [AuthGuard] },
  { path: 'candidates', component: CandidatesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
