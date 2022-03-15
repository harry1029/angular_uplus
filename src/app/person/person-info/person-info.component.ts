import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { PersonInfoService } from '../../services/system/person-info.service';
import { CodeConversionService } from '../../services/system/code-conversion.service';
import { PersonInfo } from '../../models/system/person-info';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css'],
  providers: [PersonInfoService, MessageService, CodeConversionService],
})
export class PersonInfoComponent implements OnInit {

  private apiUrl: string = environment.apiServerUrl;
  personInfo$: Observable<PersonInfo>;
  userId: number;
  userType: number;
  userTypeDes: string;
  profilePic: string;
  personName: string;
  genderName: string;
  birthData: Data;
  phone: string;
  phoneConfirmed: number;
  email: string;
  emailConfirmed: number;
  driveDegree: string;
  languages: string;

  streetName: string;
  postalCode: string;
  cityName: string;
  provinceName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private personInfoService: PersonInfoService,
    private codeConversionService: CodeConversionService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId <= 0) {
      this.userId = this.authService.userClaims.userId
    }

    this.personInfo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.personInfoService.getPersonInfo(this.userId)
      )
    );

    this.personInfo$.subscribe(person => {
      this.userId = person.id   //person.id = userId
      this.userType = person.userType
      if (person.userType <= 0) {
        this.goEdit()
      }

      if (person.profilePic == null) {
        this.profilePic = "assets/pic/no-photo.png"
      } else {
        this.profilePic = this.apiUrl + person.profilePic
      }
      this.personName = (person.lastName ? person.lastName : "") + " " + (person.firstName ? person.firstName : "");
      if (person.gender == 1) {
        this.genderName = 'Male'
      } else if (person.gender == 2) {
        this.genderName = 'Female'
      } else {
        this.genderName = '  '
      }
      this.birthData = person.birthDate;
      this.phone = person.phone;
      this.phoneConfirmed = person.phoneConfirmed;
      this.email = person.email;
      this.emailConfirmed = person.emailConfirmed;
      if (person.addressInfo != null) {
        this.streetName = person.addressInfo.streetName;
        this.postalCode = person.addressInfo.postalCode;
        if (person.addressInfo.city != null) {
          this.cityName = person.addressInfo.city.cityName;
          this.provinceName = person.addressInfo.city.provinceName;
        }
      }
      this.codeConversionService.getDisplayValueList(person.languages, "languages").subscribe(value => {
        this.languages = value;
      })
      this.codeConversionService.getCodeValue(100005, person.userType).subscribe(value => {
        this.userTypeDes = value;
      })
    })
  }

  goBack(): void {
    this.location.back();
  }

  goEdit(): void {
    this.router.navigate([`/person/edit/${this.userId}`]);
  }

  goProfilePhoto(): string {
    return `/person/photo/${this.userId}`
  }

  verifyEmail() {
    this.router.navigate([`/verifyuseremail/${this.userId}`]);
  }

}
