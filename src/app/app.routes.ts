import { Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task-create',
    component: TaskCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'task-board',
    component: TaskBoardComponent,
    canActivate: [AuthGuard],
  },
];
