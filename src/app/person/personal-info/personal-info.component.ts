import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { PersonalInfoService } from '../../services/system/personal-info.service';
import { CodeConversionService } from '../../services/system/code-conversion.service';
import { PersonalInfo } from '../../models/system/personal-info';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  providers: [PersonalInfoService, MessageService, CodeConversionService],
})
export class PersonalInfoComponent implements OnInit {

  private apiUrl: string = environment.apiServerUrl;
  personalInfo$: Observable<PersonalInfo>;
  userId: number;
  userType: number;
  userTypeDes: string;
  profilePic: string;
  personalName: string;
  sexName: string;
  birthDay: Data;
  phoneNumber: string;
  phoneNumberConfirmed: number;
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
    private personalInfoService: PersonalInfoService,
    private codeConversionService: CodeConversionService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId <= 0) {
      this.userId = this.authService.userClaims.userId
    }

    this.personalInfo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.personalInfoService.getPersonalInfo(this.userId)
      )
    );

    this.personalInfo$.subscribe(person => {
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
      this.personalName = (person.lastName ? person.lastName : "") + " " + (person.firstName ? person.firstName : "");
      if (person.sex == 1) {
        this.sexName = 'Male'
      } else if (person.sex == 2) {
        this.sexName = 'Female'
      } else {
        this.sexName = '  '
      }
      this.birthDay = person.birthDay;
      this.phoneNumber = person.phoneNumber;
      this.phoneNumberConfirmed = person.phoneNumberConfirmed;
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
    this.router.navigate([`/personal/edit/${this.userId}`]);
  }

  goProfilePhoto(): string {
    return `/personal/photo/${this.userId}`
  }

  verifyEmail() {
    this.router.navigate([`/verifyuseremail/${this.userId}`]);
  }

}
