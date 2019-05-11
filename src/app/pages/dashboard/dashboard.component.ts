import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { CandidateState } from "src/app/store/state/candidates.state";
import { CANDIDATE } from "src/app/store/actions/candidate.actions";
import { selectUserList } from "src/app/store/selectors/candidate.selector";
import { AuthService, CandidateService } from 'src/app/services';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.html"
})
export class DashboardComponent implements OnDestroy {
  subscriptions: any = {};
  subs: any = {};
  candidates: any[] = [];
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private store: Store<IAppState>,
    private router: Router
  ) {
    this.subscriptions["1"] = this.authService.getUser().subscribe(user => this.init());
  }

  init() {
    if (this.subscriptions["candidates"]) this.subscriptions["candidates"].unsubscribe();
    this.subs["candidates"] = this.store.pipe(select(selectUserList)).subscribe(res => {
      this.candidates = res.records;
    });
    this.service.getList().subscribe(res => {
      let data = res.data;
      this.store.dispatch({
        type: CANDIDATE.INIT,
        payload: data
      });
    });
  }

  addNew() {
    this.router.navigateByUrl("/create-candidate");
  }

  onEdit(id) {
    this.router.navigateByUrl(`/create-candidate/${id}`);
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
