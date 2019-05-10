import { LoginComponent } from "./login";
import { NotFoundComponent } from './not-found';
import { DashboardComponent } from './dashboard';
import { CallbackComponent } from './callback';
import {
  CreateCandidateComponent,
  CreateCandidateStep1Component,
  CreateCandidateStep2Component
} from './create-candidate';

export const PagesComponents = [
  LoginComponent,
  NotFoundComponent,
  DashboardComponent,
  CallbackComponent,
  // Candidates
  CreateCandidateComponent,
  CreateCandidateStep1Component,
  CreateCandidateStep2Component
];
