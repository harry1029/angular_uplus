import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PersonInfo } from '../../../models/system/person-info';
import { PersonInfoService } from '../../../services/system/person-info.service';

import { CellPhoneService } from '../../../services/system/cell-phone.service';
import { CodeValue } from '../../../models/system/code-value';

import { LanguageService } from '../../../services/system/language.service';
import { LanguageInfo } from '../../../models/system/language-info';


@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css'],
  providers: [MessageService, CellPhoneService, PersonInfoService, LanguageService],
})
export class TeacherEditComponent implements OnInit {

  teacherId: number;
  teacher: PersonInfo;
  gender: { id: number, type: string } [] = [
    {id: 0, type: "Male"},
    {id: 1, type: "Female"},
    {id: 2, type: "Transgender"},
    {id: 3, type: "Non-binary"},
    {id: 4, type: "Prefer not to say"},
  ];

  phoneAreaCodeList: CodeValue[];
  languageList: LanguageInfo[];

  uploadedFiles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personInfoService: PersonInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private cellPhoneService: CellPhoneService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.teacherId <= 0) {
      this.messageService.add({ severity: 'warn', detail: "Wrong Teacher Id!" });
      this.goBack()
    }
    this.personInfoService.getPersonInfo(this.teacherId).subscribe(h => {
      if (h.id <= 0) {
        this.messageService.add({ severity: 'warn', detail: "Wrong Teacher Id!" });
        this.goBack()
      }
      this.teacher = h;
      console.log(this.teacher);
    })
    this.cellPhoneService.getAvailablePhoneAreaCodes().subscribe(codes => {
      this.phoneAreaCodeList = codes;
    })
    this.languageService.getLanguageInfos().subscribe(codes => {
      this.languageList = codes;
      console.log(codes);
    })
    this.teacher = {
      id: 0, firstName: "", lastName: "", languages: []
    };
  }

  myUploader(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    console.log(this.uploadedFiles)
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  submit() {

    // if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
    //   this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
    //   return;
    // }
    this.personInfoService.updatePersonInfo(this.teacher).subscribe(iRet => {
      if (iRet > 0) {
        console.log(this.teacher);
        this.router.navigate(['/manage/teachers']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Save failed." });
      } else {
        this.messageService.add({ severity: 'error', detail: "An error occurred in the server" });
        console.log(this.teacher);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
