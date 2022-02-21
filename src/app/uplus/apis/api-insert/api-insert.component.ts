import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ApiInfo } from 'src/app/models/api/api-info';

import { ApiInfoService } from 'src/app/services/api/api-info.service';

@Component({
  selector: 'app-api-insert',
  templateUrl: './api-insert.component.html',
  styleUrls: ['./api-insert.component.css'],
  providers: [ApiInfoService, MessageService],
})
export class ApiInsertComponent implements OnInit {

  api: ApiInfo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiInfoService: ApiInfoService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.api = { id: 0, status: 0, apiMethod: 0, apiPath: "", pathParameterRequired: 0 };
  }

  submit() {
    if (this.api.apiPath == null || this.api.apiPath.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "apiPath is mandatory." });
      return;
    }
    this.apiInfoService.addApiInfo(this.api).subscribe(iRet => {
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
