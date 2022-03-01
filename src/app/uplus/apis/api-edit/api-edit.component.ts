import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ApiInfo } from 'src/app/models/api/api-info';
import { CodeValue } from 'src/app/models/system/code-value';

import { ApiInfoService } from 'src/app/services/api/api-info.service';
import { CodeConversionService } from 'src/app/services/system/code-conversion.service';

@Component({
  selector: 'app-api-edit',
  templateUrl: './api-edit.component.html',
  styleUrls: ['./api-edit.component.css'],
  providers: [ApiInfoService, MessageService, CodeConversionService],
})
export class ApiEditComponent implements OnInit {

  apiId: number;
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

  test() {
    this.codeConversionService.getCodeValues(100010)
      .subscribe(codeList => {
        console.log("API Method List: ", codeList);
      });
    this.codeConversionService.getCodeValue(100010, 2)
      .subscribe(codeList => {
        console.log("API Method Value: ", codeList);
      });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.apiId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.apiId <= 0) {
      this.messageService.add({ severity: 'warn', detail: "Wrong API Id!" });
      this.goBack()
    }
    this.apiInfoService.getApiInfo(this.apiId).subscribe(h => {
      if (h.id <= 0) {
        this.messageService.add({ severity: 'warn', detail: "Wrong API Id!" });
        this.goBack()
      }
      this.api = h;
      console.log(this.api);
      this.test();
    })
  }

  submit() {
    if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "API path is mandatory." });
      return;
    }
    this.apiInfoService.updateApiInfo(this.api).subscribe(iRet => {
      if (iRet > 0) {
        this.router.navigate(['/apis']);
      } else if (iRet == 0) {
        this.messageService.add({ severity: 'info', detail: "Save failed." });
      } else {
        this.messageService.add({ severity: 'error', detail: "An error occurred in the server" });
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
