import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ApiInfoService } from '../../../services/api/api-info.service';
import { CodeConversionService } from '../../../services/system/code-conversion.service';
import { ApiInfo } from '../../../models/api/api-info';
import { CodeValue } from '../../../models/system/code-value';


@Component({
  selector: 'app-api-insert',
  templateUrl: './api-insert.component.html',
  styleUrls: ['./api-insert.component.css'],
  providers: [ApiInfoService, MessageService, CodeConversionService],
})
export class ApiInsertComponent implements OnInit {

  api: ApiInfo;
  codeList: CodeValue[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiInfoService: ApiInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private codeConversionService: CodeConversionService,
  ) { }

  ngOnInit(): void {
    this.api = {
      id: 0, status: 0, apiMethod: 0, apiPath: "", pathParameterRequired: 0, pathParameter: "",
      queryParameter: "", queryParameter1: "", authenticationRequired: 0
    };

    this.codeConversionService.getCodeValues(100010)
      .subscribe(codeList => {
        this.codeList = codeList;
        console.log("API Method List: ", codeList);
      });
  }

  submit() {
    // this.api = {...this.api, status: Number(this.api.status), pathParameterRequired: Number(this.api.pathParameterRequired), 
    //             authenticationRequired: Number(this.api.authenticationRequired)};

    if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
      return;
    }
    this.apiInfoService.addApiInfo(this.api).subscribe(iRet => {
      if (iRet > 0) {
        this.router.navigate(['/manage/apis']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Save failed." });
      } else {
        this.messageService.add({ severity: 'error', detail: "An error occurred in the server" });
        console.log(this.api)
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
