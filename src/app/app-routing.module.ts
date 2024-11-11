import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./component/auth/auth.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard} from "./guard/auth.guard";
import {TaskComponent} from "./component/task/task.component";
import {ProjectComponent} from "./component/project/project.component";

const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectComponent ,canActivate: [AuthGuard]},
  { path: 'task/:id', component: TaskComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
