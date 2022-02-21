import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';

import { ApiInfo } from '../../../models/api/api-info'
import { ApiInfoService } from '../../../services/api/api-info.service'



@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css'],
  providers: [ApiInfoService, MessageService],
})

// Export the class component for router to use @uplus-routing.module.ts
export class ApiListComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl + "/h";
  apis: ApiInfo[];
  // heroes: Hero[];
  selected: ApiInfo;

  constructor(
    private apiInfoService: ApiInfoService,
    // private heroService: HeroService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // this.getHeroes();

    this.getAPIs();
  }

  getAPIs(): void {
    this.apiInfoService.getApiInfos()
      .subscribe(apis => {
        this.apis = apis;
        console.log("APIs: ", apis);
      });
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //     .subscribe(heroes => {
  //       this.heroes = heroes;
  //     });
  // }

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

  // deleteHero(h: Hero): void {
  //   this.heroService.deleteHero(h.id).subscribe(
  //     deleteN => {
  //       if (deleteN > 0) {
  //         let message = 'The hero "' + this.selected.name + '" has been successfully deleted.'
  //         this.messageService.clear();
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
  //         this.getHeroes();
  //       } else {
  //         this.messageService.clear();
  //         this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No hero has been deleted.', life: 10000 });
  //       }
  //     });
  // }

  deleteConfirm(api: ApiInfo) {
    this.selected = api;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the API' });
  }

  // deleteConfirm(h: Hero) {
  //   this.selected = h;
  //   this.messageService.clear();
  //   this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the hero' });
  // }

  onConfirm() {
    this.deleteAPI(this.selected);
    this.messageService.clear('c');
  }

  // onConfirm() {
  //   this.deleteHero(this.selected);
  //   this.messageService.clear('c');
  // }

  onReject() {
    this.messageService.clear('c');
  }

  // onReject() {
  //   this.messageService.clear('c');
  // }

  insert() {
    this.router.navigate([`/apiinsert`]);
  }

  // insert() {
  //   this.router.navigate([`/heroinsert`]);
  // }

  edit(api: ApiInfo) {
    this.selected = api;
    this.router.navigate([`/apiedit/${api.id}`]);
  }

  // edit(h: Hero) {
  //   this.selected = h;
  //   this.router.navigate([`/heroedit/${h.id}`]);
  // }


}