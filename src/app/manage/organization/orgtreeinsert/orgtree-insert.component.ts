import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { UserMeneuService } from '../../services/system/user-meneu.service';
import { OrgTree } from '../../models/system/org-tree';

@Component({
  selector: 'app-orgtree-insert',
  templateUrl: './orgtree-insert.component.html',
  styleUrls: ['./orgtree-insert.component.scss'],
  providers: [MessageService, UserMeneuService]
})
export class OrgtreeInsertComponent implements OnInit, OnChanges {

  @Output() private operateResult = new EventEmitter();
  @Input() menuItemId: number;
  item: OrgTree;
  parentItem: OrgTree;
  buttonFlag: boolean = true;     //用于控制提交按钮的显示，避免重复提交。

  constructor(
      private primengConfig: PrimeNGConfig,
      private messageService: MessageService,
      private userMenuService: UserMeneuService,
  ) { }

  ngOnInit(): void {
      this.primengConfig.ripple = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.item = { id: 0, parentId: this.menuItemId};
  }

  submit() {

      if (this.item.name == null || this.item.name.trim().length < 1) {
          this.messageService.add({ severity: 'warn', detail: "菜单名不能为空" });
          return;
      }
      this.buttonFlag = false;
      this.userMenuService.addMenuItem(this.item).subscribe(iRet => {
          this.buttonFlag = true;
          if (iRet > 0) {
              this.operateResult.emit(iRet);
          } else if (iRet == 0) {
              this.messageService.add({ severity: 'info', detail: this.item.name + " 菜单信息添加失败，请重试" });
          } else {
              this.messageService.add({ severity: 'error', detail: "服务器内部出现错误，请稍后再试" });
          }
      })
  }

  goBack(): void {
      this.operateResult.emit(0);
  }

}
