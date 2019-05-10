import { Component, OnDestroy, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IAppState } from "src/app/store/state/app.state";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService, CandidateService, CandidateModel } from 'src/app/services';

@Component({
  selector: "app-create-candidate-step1",
  templateUrl: "step1.html"
})
export class CreateCandidateStep1Component implements OnDestroy, OnInit {
  @Output() onChanges: EventEmitter<any> = new EventEmitter();
  @Output() onStepChange: EventEmitter<boolean> = new EventEmitter();
  @Input() data: any = {};
  form: FormGroup;
  subs: any = {};
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private store: Store<IAppState>,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const data = this.data;
    this.form = this.fb.group({
      firstName: [data.firstName ? data.firstName : "", [Validators.required]],
      lastName: [data.lastName ? data.lastName : "", [Validators.required]],
      maidenName: [data.maidenName ? data.maidenName : "", [Validators.required]],
      givenName: [data.givenName ? data.givenName : "", [Validators.required]],
      availablePer: [data.availablePer ? data.availablePer : "", [Validators.required]],
      dateOfBirth: [data.dateOfBirth ? data.dateOfBirth : "", [Validators.required]],
      familyNamePreposition: [data.familyNamePreposition ? data.familyNamePreposition : "", [Validators.required]],
      initials: [data.initials ? data.initials : "", [Validators.required]],
      interviewDate: [data.interviewDate ? data.interviewDate : "", [Validators.required]],
      skypeId: [data.skypeId ? data.skypeId : "", [Validators.required]],
      cvUrl: [data.cvUrl ? data.cvUrl : ""],
      businessEmailAddress: [data.businessEmailAddress ? data.businessEmailAddress : "", [Validators.required, Validators.email]],
      privateEmailAddress: [data.privateEmailAddress ? data.privateEmailAddress : "", [Validators.required, Validators.email]]
    });
    this.subs["d"] = this.form.valueChanges
    .subscribe(changes => this.emitChangedData());
  }

  emitChangedData() {
    let data: any = {};
    for (let key in this.form.controls) {
      data[key] = this.form.controls[key].value;
    }
    if (data["dateOfBirth"]) {
      data["dateOfBirth"] = new Date(data["dateOfBirth"]).toISOString();
    }
    if (data["interviewDate"]) {
      data["interviewDate"] = new Date(data["interviewDate"]).toISOString();
    }
    if (data["availablePer"]) {
      data["availablePer"] = new Date(data["availablePer"]).toISOString();
    }
    this.onChanges.emit(data);
  }

  onStep() {
    this.onStepChange.emit(true);
  }

  ngOnDestroy() {
    this.onChanges.unsubscribe();
    this.onStepChange.unsubscribe();
  }
}
