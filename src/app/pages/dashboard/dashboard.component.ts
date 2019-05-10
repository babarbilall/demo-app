import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { CandidateState } from "src/app/store/state/candidates.state";
import { AuthService, CandidateService } from 'src/app/services';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardComponent implements OnDestroy {
  subscriptions: any = {};
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private store: Store<IAppState>,
    private router: Router
  ) {
    this.subscriptions["1"] = this.authService.getUser().subscribe(user => {
      this.init();
    });
  }

  init() {
    // this.service.getList().subscribe(res => {
    //   console.log(this.store);
    // });
  }

  addNew() {
    this.router.navigateByUrl("/create-candidate");
  }

  logout() {
    this.authService.doLogout();
  }

  ngOnDestroy(): void {
    for (let key in this.subscriptions) {
      if (this.subscriptions[key]) this.subscriptions[key].unsubscribe();
    }
  }
}
