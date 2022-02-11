import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
    styleUrls: ['./my-home.component.css'],
    providers: [MessageService],
})
export class MyHomeComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        public authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
  }

}
