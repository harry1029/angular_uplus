import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-exit-admin',
  templateUrl: './exit-admin.component.html',
  styleUrls: ['./exit-admin.component.css']
})
export class ExitAdminComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.setNormalMenu();
    this.authService.userLoggedInNext();
    this.router.navigate(['/home']);
  }

}
