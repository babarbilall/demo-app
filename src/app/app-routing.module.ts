import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard';
import { CallbackComponent } from './pages/callback';
import { CreateCandidateComponent } from './pages/create-candidate';


const routes: Routes = [
  { path: "", children: [
    { path: "", pathMatch: "full", redirectTo: "dashboard" },
    { path: "dashboard", component: DashboardComponent },
    { path: "create-candidate", component: CreateCandidateComponent },
    { path: "login", component: LoginComponent },
    { path: "callback.html", component: CallbackComponent },
    { path: "*", component: NotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
