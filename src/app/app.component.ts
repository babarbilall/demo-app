import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService, CandidateService } from './services';
import { CANDIDATE } from './store/actions/candidate.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  inited = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<any>,
    private service: CandidateService
  ) {
    if (location.pathname.includes("callback") || location.pathname.includes("login")) {
      this.inited = true;
    } else {
      this.auth.getUser().subscribe(user => {
        this.inited = true;
        if (user === null) {
          this.router.navigateByUrl("/login");
        } else {
          this.fetchCandidates();
        }
      });
    }
  }

  fetchCandidates() {
    this.service.getList().subscribe(res => {
      const data = res.data;
      // this.store.dispatch({
      //   type: CANDIDATE.INIT,
      //   data
      // });
    });
  }
}
