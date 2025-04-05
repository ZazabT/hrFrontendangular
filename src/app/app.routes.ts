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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent },  
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'salaries', component: SalariesComponent },
    { path: 'positions', component: PositionsComponent },
    { path: 'leaves', component: LeavesComponent },
    { path: 'listings', component: ListingsComponent },
    { path: 'candidates', component: CandidatesComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}
