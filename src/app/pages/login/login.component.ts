import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/services';

@Component({
  selector: "app-login",
  templateUrl: "login.html"
})
export class LoginComponent implements OnDestroy {
  subscriptions: any = {};
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.subscriptions["1"] = this.authService.getUser().subscribe(user => {
      if (user) this.router.navigateByUrl("/dashboard");
    });
  }

  onLoginClick(): void {
    this.authService.doLogin();
  }

  ngOnDestroy(): void {
    for (let key in this.subscriptions) {
      if (this.subscriptions[key]) this.subscriptions[key].unsubscribe();
    }
  }
}
