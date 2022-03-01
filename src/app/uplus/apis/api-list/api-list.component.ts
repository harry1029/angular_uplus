import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';

import { ApiInfo } from '../../../models/api/api-info'
import { ApiInfoService } from '../../../services/api/api-info.service'

import { CodeConversionService } from 'src/app/services/system/code-conversion.service';
import { CodeValue } from 'src/app/models/system/code-value';



@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css'],
  providers: [ApiInfoService, MessageService, CodeConversionService],
})

// Export the class component for router to use @uplus-routing.module.ts
export class ApiListComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl + "/h";
  apis: ApiInfo[];

  selected: ApiInfo;
  codeValues: CodeValue[];

  constructor(
    private apiInfoService: ApiInfoService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,

    private codeConversionService: CodeConversionService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.codeConversionService.getCodeValues(100010)
    .subscribe(codeList => {
      this.codeValues = codeList;
      console.log(this.codeValues)
    });
    this.getAPIs();
  }

  getAPIs(): void {
    this.apiInfoService.getApiInfos()
      .subscribe(apis => {
        this.apis = apis;
        console.log("APIs: ", apis);
      });
  }

  deleteAPI(api: ApiInfo): void {
    this.apiInfoService.deleteApiInfo(api.id).subscribe(
      deleteN => {
        if (deleteN > 0) {
          let message = 'The api "' + this.selected.apiPath + '" has been successfully deleted.'
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000});
          this.getAPIs();
        } else {
          this.messageService.clear();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No api has been deleted.', life: 10000});
        }
      });
  }

  deleteConfirm(api: ApiInfo) {
    this.selected = api;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the API' });
  }

  onConfirm() {
    this.deleteAPI(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/apiinsert`]);
  }


  edit(api: ApiInfo) {
    this.selected = api;
    this.router.navigate([`/apiedit/${api.id}`]);
  }

  detail(api: ApiInfo) {
    this.selected = api;
    this.router.navigate([`/apidetail/${api.id}`]);
  }

}