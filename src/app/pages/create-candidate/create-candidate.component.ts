import { Component} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IAppState } from "src/app/store/state/app.state";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService, CandidateService, CandidateModel } from 'src/app/services';

@Component({
  selector: "app-create-candidate",
  templateUrl: "create-candidate.html"
})
export class CreateCandidateComponent {
  request: CandidateModel = {
    drivingLicenses: ["761065f3-194f-45e2-9a47-d1e9080e64ad"],
    typesOfTransportation: ["761065f3-194f-45e2-9a47-d1e9080e64ad"],
    applicationUser: {
      notificationHubConnectionId: "761065f3-194f-45e2-9a47-d1e9080e64ad",
      applicationId: "761065f3-194f-45e2-9a47-d1e9080e64ad",
      loginUserId: "761065f3-194f-45e2-9a47-d1e9080e64ad"
    },
    enabledNotification: true,
    nickname: "test",
    educationLevel: {
      value: "Masters",
      countryCode: "09"
    },
    photo: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    branchOffice: {
      "isHeadQuarter": true
    },
    lastContact: "2019-04-17T13:35:26.538Z",
    category: ["761065f3-194f-45e2-9a47-d1e9080e64ad"],
    origin: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    countryOfBirth: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    nationality: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    placeOfBirth: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    title: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    maritalStatus: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    gender: "761065f3-194f-45e2-9a47-d1e9080e64ad",
    ssn: "111-111-111-1",
    consultantId: "d1d98565-6066-423c-1f76-08d6cd78eedb"
  };
  step = {
    s1: true,
    s2: false
  };
  requestSent: boolean = false;
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private store: Store<IAppState>,
    private router: Router
  ) { }

  onChanges(fields) {
    for (let key in fields) {
      this.request[key] = fields[key];
    }
  }

  changeStep(key) {
    for (let skey in this.step) {
      this.step[skey] = false;
    }
    this.step[key] = true;
  }

  onFinish() {
    this.requestSent = true;
    this.service.create(this.request).subscribe(res => {
      this.requestSent = false;
      this.router.navigateByUrl("/dashboard");
    });
  }

  navigate(path) {
    this.router.navigateByUrl(path);
  }
}
