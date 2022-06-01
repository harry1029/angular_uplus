import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PersonInfo } from 'src/app/models/system/person-info';
import { PersonInfoService } from 'src/app/services/system/person-info.service';

import { CellPhoneService } from 'src/app/services/system/cell-phone.service';
import { CodeConversionService } from 'src/app/services/system/code-conversion.service';
import { CodeValue } from 'src/app/models/system/code-value';

import { LanguageService } from 'src/app/services/system/language.service';
import { LanguageInfo } from 'src/app/models/system/language-info';



@Component({
  selector: 'app-teacher-insert',
  templateUrl: './teacher-insert.component.html',
  styleUrls: ['./teacher-insert.component.css'],
  providers: [PersonInfoService, CellPhoneService, MessageService, CodeConversionService, LanguageService],
})
export class TeacherInsertComponent implements OnInit {

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
    private codeConversionService: CodeConversionService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
    this.personInfoService.addTeacher(this.teacher).subscribe(iRet => {
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
