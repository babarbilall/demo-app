import { Component, OnDestroy, Output, Input, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IAppState } from "src/app/store/state/app.state";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService, CandidateService, CandidateModel } from 'src/app/services';

@Component({
  selector: "app-create-candidate-step2",
  templateUrl: "step2.html"
})
export class CreateCandidateStep2Component implements OnDestroy {
  @Output() onChanges: EventEmitter<any> = new EventEmitter();
  @Output() onBack: EventEmitter<boolean> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() requestSent: boolean = false;
  @Input() data: any = {};
  addressForm: FormGroup;
  mobilePhoneForm: FormGroup;
  privatePhoneForm: FormGroup;
  businessPhoneForm: FormGroup;
  subs: any = {};
  constructor(
    private authService: AuthService,
    private service: CandidateService,
    private store: Store<IAppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.init();
  }

  init() {
    this.initForm();
  }

  initForm() {
    this.addressForm = this.fb.group({
      street: ["", [Validators.required]],
      houseNumber: ["", [Validators.required]],
      houseNumberAddition: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      country: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      province: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      municipality: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      countryCode: ["", [Validators.required]],
      apartmentNumber: ["", [Validators.required]],
      apartmentNumberAddition: ["", [Validators.required]]
    });
    const phoneFormData = {
      number: ["", [Validators.required]],
      localFormat: ["", [Validators.required]],
      internationalFormat: ["", [Validators.required]],
      countryPrefix: ["", [Validators.required]],
      countryCode: ["", [Validators.required]],
      countryName: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      location: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      carrier: ["", [Validators.required]],
      lineType: ["761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]]
    };
    this.mobilePhoneForm = this.fb.group(phoneFormData);
    this.privatePhoneForm = this.fb.group(phoneFormData);
    this.businessPhoneForm = this.fb.group(phoneFormData);

    this.subs["a"] = this.addressForm.valueChanges
    .subscribe(changes => this.emitChangedData('homeAddress', 'addressForm'));

    this.subs["b"] = this.mobilePhoneForm.valueChanges
    .subscribe(changes => this.emitChangedData('mobilePhoneNumber', 'mobilePhoneForm'));

    this.subs["c"] = this.privatePhoneForm.valueChanges
    .subscribe(changes => this.emitChangedData('privatePhoneNumber', 'privatePhoneForm'));

    this.subs["d"] = this.businessPhoneForm.valueChanges
    .subscribe(changes => this.emitChangedData('businessPhoneNumber', 'businessPhoneForm'));
  }

  onSubmit() {
    this.submit.emit(true);
  }

  emitChangedData(key, form) {
    let data: any = {};
    for (let fkey in this[form].controls) {
      data[fkey] = this[form].controls[fkey].value;
    }
    this.onChanges.emit({ [key]: data });
  }

  onBackStep() {
    this.onBack.emit(true);
  }

  ngOnDestroy() {
    this.onChanges.unsubscribe();
    for (let key in this.subs) {
      this.subs[key].unsubscribe();
    }
  }
}
