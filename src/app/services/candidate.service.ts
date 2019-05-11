import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable()
export class CandidateService {
  private candidates: any[] = [];
  private candidate$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private READ_API: string = environment.READ_API;
  private WRITE_API: string = environment.WRITE_API;
  constructor(private http: HttpClient) {}

  getList(skip?: number, take?: number): Observable<any> {
    let params: any = {
      skip: skip ? skip : 0,
      take: take ? take : 100
    };
    return this.http.get(`${this.READ_API}/candidate/consultant`, {
      params: params
    }).pipe(map(res => res));
  }

  getCandidate(id: string): Observable<any> {
    return this.http.get(`${this.READ_API}/candidate/${id}`)
    .pipe(map(res => res));
  }

  create(body: CandidateModel): Observable<any> {
    return this.http.post(`${this.WRITE_API}/candidate`, body)
    .pipe(map(res => res));
  };
}

export interface CandidateModel {
  id?: string;
  consultantId?: string;
  firstName?: string;
  lastName?: string;
  familyNamePreposition?: string;
  initials?: string;
  maidenName?: string;
  givenName?: string;
  dateOfBirth?: string;
  interviewDate?: string;
  nationality?: string;
  photo?: string;
  placeOfBirth?: string;
  countryOfBirth?: string;
  availablePer?: string;
  skypeId?: string;
  title?: string;
  maritalStatus?: string;
  gender?: string;
  ssn?: string;
  businessEmailAddress?: string;
  privateEmailAddress?: string;
  mobilePhoneNumber?: CandidatePhoneNumberModel;
  businessPhoneNumber?: CandidatePhoneNumberModel;
  privatePhoneNumber?: CandidatePhoneNumberModel;
  cvUrl?: string;
  drivingLicenses?: any[];
  typesOfTransportation?: any[];
  homeAddress?: CandidateHomeAddressModel;
  applicationUser: any;
  enabledNotification: boolean;
  nickname?: string;
  educationLevel?: any;
  branchOffice?: any;
  lastContact?: string;
  origin?: string;
  category?: string[];
}

export interface CandidateHomeAddressModel {
  street: string;
  houseNumber: string;
  houseNumberAddition: string;
  postalCode: string;
  country: string;
  province: string;
  municipality: string;
  countryCode: string;
  apartmentNumber: string;
  apartmentNumberAddition: string;
}

export interface CandidatePhoneNumberModel {
  number: string;
  localFormat: string;
  internationalFormat: string;
  countryPrefix: string;
  countryCode: string;
  countryName: string;
  location: string;
  carrier: string;
  lineType: string;
}
