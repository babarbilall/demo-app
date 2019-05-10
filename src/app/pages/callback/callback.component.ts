import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, CandidateService } from 'src/app/services';

@Component({
  selector: "app-callback",
  template: ""
})
export class CallbackComponent {
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private router: Router
  ) {
    this.authService.onLoginCallback().subscribe(user => {
      this.fetchCandidates();
    }, err => {
      this.router.navigateByUrl("/login");
    });
  }

  fetchCandidates() {
    this.service.getList().subscribe(res => {
      this.router.navigateByUrl("/dashboard");
    });
  }
}
