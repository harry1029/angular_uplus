import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { environment } from '../../../../environments/environment';
import { Hero } from '../../../models/uplus/hero';
import { HeroService } from '../../../services/uplus/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  providers: [HeroService, MessageService],
})
export class HeroListComponent implements OnInit {

  apiUrl: string = environment.apiServerUrl + "/h";
  heroes: Hero[];
  selected: Hero;

  constructor(
    private heroService: HeroService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }

  deleteHero(h: Hero): void {
    this.heroService.deleteHero(h.id).subscribe(
      deleteN => {
        if (deleteN > 0) {
          let message = 'The hero "' + this.selected.name + '" has been successfully deleted.'
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: message, life: 10000 });
          this.getHeroes();
        } else {
          this.messageService.clear();
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No hero has been deleted.', life: 10000 });
        }
      });
  }

  deleteConfirm(h: Hero) {
    this.selected = h;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the hero' });
  }

  onConfirm() {
    this.deleteHero(this.selected);
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  insert() {
    this.router.navigate([`/heroinsert`]);
  }

  edit(h: Hero) {
    this.selected = h;
    this.router.navigate([`/heroedit/${h.id}`]);
  }

}
