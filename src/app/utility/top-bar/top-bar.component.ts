import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { MenuItem } from '../../models/system/menu-item';
import { UserMenuService } from '../../services/system/user-menu.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [UserMenuService],
})
export class TopBarComponent implements OnInit {

  @Input() bIndex: number;

  bottomMenuImage: string = "assets/pic/page/bottom_menu_1.png";
  bottomMenuImageT: string = "assets/pic/page/bottom_menu_t1.png";

  items: MenuItem[];

  constructor(
    public authService: AuthService,
    private router: Router,
    private userMenuService: UserMenuService,
  ) { }

  goPersonalInfo(): string {
    return `/personal/my/${this.authService.userClaims.userId}`
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe(
      _ => { this.getUserMainMenu() });   //订阅到新值后说明用户完成登录，需要更新用户菜单
    this.getUserMainMenu();
  }

  logout() {
    this.authService.logout();
    //Refresh menu
    this.getUserMainMenu();
  }

  private getUserMainMenu() {
    this.userMenuService.getUserMainMenu(this.authService.getMenuRootId())
      .subscribe(userMenu => {
        this.items = userMenu.items;
      });
  }

  private getAdminMenu() {
    this.userMenuService.getUserMainMenu(1000)
      .subscribe(userMenu => {
        this.items = userMenu.items;
      });
  }
}
