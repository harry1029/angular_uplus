import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../services/system/language.service';
import { PersonInfoService } from '../../services/system/person-info.service';
import { ScheduleService } from '../../services/system/schedule.service';
import { AuthService } from '../../auth/auth.service';
import { AddressInfo } from '../../models/system/address-info';
import { City } from '../../models/system/city';
import { CodeValue } from '../../models/system/code-value';
import { LanguageInfo } from '../../models/system/language-info';
import { PersonInfo } from '../../models/system/person-info';

@Component({
  selector: 'app-person-info-edit',
  templateUrl: './person-info-edit.component.html',
  styleUrls: ['./person-info-edit.component.css'],
  providers: [PersonInfoService, MessageService, LanguageService, ScheduleService],
})
export class PersonInfoEditComponent implements OnInit {

  @ViewChild('addressPlace') addressPlace;
  addtessTitle: string = "Address";
  currentAddress: string;
  currentCountry: string;
  currentProvince: string;
  currentCity: string;
  selectedCity: City; //for place-autocomplete
  currentPostcode: string;

  buttonFlag: boolean = true

  private apiUrl: string = environment.apiServerUrl;
  userId: number;
  familyName: string;
  givenName: string;
  sexCode: CodeValue;
  sexList: CodeValue[];
  birthDay: Date = new Date(2000, 0, 1);
  minDate: Date;
  maxDate: Date;
  email: string;
  emailConfirmed: number;
  languageList: LanguageInfo[];
  languages: number[];
  profilePic: string;
  userType: number = 1;
  personId: number;
  personInfo: PersonInfo

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private personInfoService: PersonInfoService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.languageService.getLanguageInfos().subscribe(codes => {
      this.languageList = codes;
    })
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.personInfoService.getPersonInfo(this.userId).subscribe(person => {
      this.personInfo = person
      this.userId = person.id
      if (person.profilePic == null || person.profilePicId == 0) {
        this.profilePic = "assets/pic/page/take_portrait.png"
      } else {
        this.profilePic = this.apiUrl + person.profilePic
      }

      if (person.gender == 1) {
        this.sexCode = { id: 1, id32: 0, keyCode: 'Male' }
      } else if (person.gender == 2) {
        this.sexCode = { id: 2, id32: 0, keyCode: 'Female' }
      } else {
        this.sexCode = { id: 0, id32: 0, keyCode: '  ' }
      }
      this.birthDay = new Date(person.birthDate);
      this.familyName = person.lastName;
      this.givenName = person.firstName;
      this.email = person.email;
      this.emailConfirmed = person.emailConfirmed;
      if (person.addressInfo != null && person.addressInfo.city != null) {
        this.currentAddress = person.addressInfo.streetName
        this.currentPostcode = person.addressInfo.postalCode
        this.currentCity = person.addressInfo.city.cityName
        this.selectedCity = { id: person.addressInfo.city.id, cityName: person.addressInfo.city.cityName }
        this.currentProvince = person.addressInfo.city.provinceName
        this.currentCountry = person.addressInfo.city.countryName
      };
      this.languages = person.languages;
      this.userType = person.userType;
      this.personId = person.personId;
    })

    let today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(today.getFullYear() - 100);
    this.maxDate.setFullYear(today.getFullYear() - 1);
    this.sexList = [
      { id: 0, id32: 0, keyCode: '  ' },
      { id: 1, id32: 0, keyCode: 'Male' },
      { id: 2, id32: 0, keyCode: 'Female' }
    ];

  }

  goBack(): void {
    this.location.back();
  }

  submit() {

    if (this.familyName == null || this.familyName.trim().length < 1 || this.givenName == null || this.givenName.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "Name is required." });
      return;
    }
    this.currentAddress = this.addressPlace.getAddress();
    this.currentCountry = this.addressPlace.getCountry();
    this.currentProvince = this.addressPlace.getProvince();
    this.currentCity = this.addressPlace.getCity();
    this.currentPostcode = this.addressPlace.getPostcode();
    if (this.currentAddress == null || this.currentAddress.trim().length < 6) {
      this.currentCountry = null;
      this.currentProvince = null;
      this.currentCity = null;
      this.currentPostcode = null;
    } else if (this.currentProvince == null || this.currentProvince.trim().length < 2) {
      this.messageService.add({ severity: 'warn', detail: "Province is required." });
      return;
    } else if (this.currentCity == null || this.currentCity.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "City is required." });
      return;
    }

    this.buttonFlag = false;
    let city: City;
    let address: AddressInfo;
    if (this.currentAddress == null || this.currentAddress.trim().length < 6) {
      address = null;
    } else {
      city = { id: 0, cityName: this.currentCity, provinceName: this.currentProvince, countryName: this.currentCountry }
      address = { id: 0, city: city, postalCode: this.currentPostcode, streetName: this.currentAddress }
    }
    //personId当前情况无意义，以数据库为准。
    this.personInfo.firstName = this.givenName
    this.personInfo.lastName = this.familyName
    this.personInfo.birthDate = this.birthDay
    this.personInfo.email = this.email
    this.personInfo.addressInfo = address
    if (this.sexCode == null) {
      this.personInfo.gender = 0;
    } else {
      this.personInfo.gender = this.sexCode.id;
    }
    this.personInfo.languages = this.languages;
    this.personInfoService.updatePersonInfo(this.personInfo).subscribe(iRet => {
      this.buttonFlag = true;
      if (iRet > 0) {
        this.messageService.add({ severity: 'success', detail: "Person information updated successfully" });       //cannot be showen
        this.authService.updateUserClaims() //为刷新显示的用户姓名
        this.router.navigate(['/person/my', this.personInfo.id]);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Update failed, please try again" });
      } else {
        this.messageService.add({ severity: 'error', detail: "There was an error inside the server, please try again later" });
      }
    })
  }

  goProfilePhoto(): string {
    return `/person/photo/${this.userId}`
  }

}
