import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Hero } from '../../../models/uplus/hero';

import { HeroService } from '../../../services/uplus/hero.service';

@Component({
  selector: 'app-hero-insert',
  templateUrl: './hero-insert.component.html',
  styleUrls: ['./hero-insert.component.css'],
  providers: [HeroService, MessageService],
})
export class HeroInsertComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.hero = { id: 0, name: "" };
  }

  submit() {
    if (this.hero.name == null || this.hero.name.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "Name is mandatory." });
      return;
    }
    this.heroService.addHero(this.hero).subscribe(iRet => {
      if (iRet > 0) {
        this.router.navigate(['/heroes']);
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
