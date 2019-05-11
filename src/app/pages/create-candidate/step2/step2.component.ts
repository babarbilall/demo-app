import { Component, OnDestroy, Output, Input, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IAppState } from "src/app/store/state/app.state";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService, CandidateService, CandidateModel } from 'src/app/services';

@Component({
  selector: "app-create-candidate-step2",
  templateUrl: "step2.html"
})
export class CreateCandidateStep2Component implements OnInit, OnDestroy {
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
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let data = this.data.homeAddress ? this.data.homeAddress : {};
    this.addressForm = this.fb.group({
      street: [data.street ? data.street : "", [Validators.required]],
      houseNumber: [data.houseNumber ? data.houseNumber : "", [Validators.required]],
      houseNumberAddition: [data.houseNumberAddition ? data.houseNumberAddition : "", [Validators.required]],
      postalCode: [data.postalCode ? data.postalCode : "", [Validators.required]],
      country: [data.country ? data.country : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      province: [data.province ? data.province : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      municipality: [data.municipality ? data.municipality : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
      countryCode: [data.countryCode ? data.countryCode : "", [Validators.required]],
      apartmentNumber: [data.apartmentNumber ? data.apartmentNumber : "", [Validators.required]],
      apartmentNumberAddition: [data.apartmentNumberAddition ? data.apartmentNumberAddition : "", [Validators.required]]
    });
    ["privatePhoneNumber", "mobilePhoneNumber", "businessPhoneNumber"].forEach((key, idx) => {
      data = this.data[key] ? this.data[key] : {};
      const phoneFormData = {
        number: [data.number ? data.number : "", [Validators.required]],
        localFormat: [data.localFormat ? data.localFormat : "", [Validators.required]],
        internationalFormat: [data.internationalFormat ? data.internationalFormat : "", [Validators.required]],
        countryPrefix: [data.countryPrefix ? data.countryPrefix : "", [Validators.required]],
        countryCode: [data.countryCode ? data.countryCode : "", [Validators.required]],
        countryName: [data.countryName ? data.countryName : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
        location: [data.location ? data.location : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]],
        carrier: [data.carrier ? data.carrier : "", [Validators.required]],
        lineType: [data.lineType ? data.lineType : "761065f3-194f-45e2-9a47-d1e9080e64ad", [Validators.required]]
      };
      if (key == "mobilePhoneNumber") {
        this.mobilePhoneForm = this.fb.group(phoneFormData);
      } else if (key == "privatePhoneNumber") {
        this.privatePhoneForm = this.fb.group(phoneFormData);
      } else {
        this.businessPhoneForm = this.fb.group(phoneFormData);
      }
    });

    if (this.subs["a"]) this.subs["a"].unsubscribe();
    this.subs["a"] = this.addressForm.valueChanges
    .subscribe(changes => this.emitChangedData('homeAddress', 'addressForm'));

    if (this.subs["b"]) this.subs["b"].unsubscribe();
    this.subs["b"] = this.mobilePhoneForm.valueChanges
    .subscribe(changes => this.emitChangedData('mobilePhoneNumber', 'mobilePhoneForm'));

    if (this.subs["c"]) this.subs["c"].unsubscribe();
    this.subs["c"] = this.privatePhoneForm.valueChanges
    .subscribe(changes => this.emitChangedData('privatePhoneNumber', 'privatePhoneForm'));

    if (this.subs["d"]) this.subs["d"].unsubscribe();
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
