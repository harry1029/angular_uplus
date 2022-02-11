import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    constructor(
        public authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.setShowTopbarFlag(true);
  }

}
