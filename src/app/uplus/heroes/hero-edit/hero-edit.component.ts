import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Hero } from '../../../models/uplus/hero';

import { HeroService } from '../../../services/uplus/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css'],
  providers: [HeroService, MessageService],
})
export class HeroEditComponent implements OnInit {

  heroId: number;
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
    this.primengConfig.ripple = true;
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.heroId <= 0) {
      this.messageService.add({ severity: 'warn', detail: "Wrong Hero Id!" });
      this.goBack()
    }
    this.heroService.getHero(this.heroId).subscribe(h => {
      if (h.id <= 0) {
        this.messageService.add({ severity: 'warn', detail: "Wrong Hero Id!" });
        this.goBack()
      }
      this.hero = h
    })
  }

  submit() {
    if (this.hero.name == null || this.hero.name.trim().length < 1) {
      this.messageService.add({ severity: 'warn', detail: "Name is mandatory." });
      return;
    }
    this.heroService.updateHero(this.hero).subscribe(iRet => {
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
