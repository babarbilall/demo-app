import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Observer, Subscription, timer } from "rxjs";
declare var Oidc: any;

@Injectable()
export class AuthService {
  private config = {
    authority: "https://sso.coofra.nl",
    client_id: "fe-demo2",
    client_secret: "secret",
    redirect_uri: "http://localhost:4200/callback.html",
    response_type:"code",
    scope:'full_access read_only offline_access'
  };
  private mgr: any;
  private user: User = null;
  private timer$: any;

  constructor(private router: Router) {
    this.mgr = new Oidc.UserManager(this.config);
  }

  onLoginCallback(): Observable<User | boolean> {
    return Observable.create((observer: Observer<User | boolean>) => {
      new Oidc.UserManager({ response_mode:"query" }).signinRedirectCallback().then((user) => {
        this.user = user;
        observer.next(user);
        observer.complete();
      }).catch((e) => {
        observer.error(new Error("not a valid callback"));
      });
    });
  }

  removeUser() {
    this.user = null;
  }

  getAuthUser(): User {
    return this.user;
  }

  getUser(): Observable<User> {
    return Observable.create((observer: Observer<User>) => {
      this.mgr.getUser().then((user: User) => {
        let temp: any = (user || {});
        if (temp.expired || !user) {
          this.mgr.removeUser();
          observer.next(null);
        } else {
          this.user = user;
          observer.next(user);
          this.turnOnTimer();
        }
      });
    });
  }

  turnOnTimer() {
    if (this.timer$) {
      clearTimeout(this.timer$);
      this.timer$ = null;
    }
    let now = new Date().getTime();
    let timer = (this.user.expires_at * 1000) - now;
    this.timer$ = setTimeout(() => {
      this.removeUser();
    }, timer);
  }

  doLogin() {
    this.mgr.signinRedirect();
  }

  doLogout() {
    this.removeUser();
    this.mgr.signoutRedirect();
  }
}

export interface User {
  access_token: string;
  expires_at: number;
  id_token: any;
  profile: any;
  refresh_token: string;
  scope: string;
  session_state: any;
  state: any;
  token_type: string;
  expired: boolean;
  expires_in: number;
  scopes: Array<string>;
};