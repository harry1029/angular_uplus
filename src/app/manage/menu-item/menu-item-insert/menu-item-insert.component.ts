import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { UserMenuService } from '../../../services/system/user-menu.service';
import { MenuItem } from '../../../models/system/menu-item';

@Component({
    selector: 'app-menu-item-insert',
    templateUrl: './menu-item-insert.component.html',
    styleUrls: ['./menu-item-insert.component.css'],
    providers: [MessageService, UserMenuService]
})
export class MenuItemInsertComponent implements OnInit, OnChanges {

    @Output() private operateResult = new EventEmitter();
    @Input() menuItemId: number;
    item: MenuItem;
    parentItem: MenuItem;
    buttonFlag: boolean = true;     //用于控制提交按钮的显示，避免重复提交。
    status: boolean = true;

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private userMenuService: UserMenuService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.item = { id: 0, parentId: this.menuItemId};
    }

    submit() {

        if (this.item.label == null || this.item.label.trim().length < 1) {
            this.messageService.add({ severity: 'warn', detail: "菜单名不能为空" });
            return;
        }
        if (this.status) {
            this.item.status = 1
        } else {
            this.item.status = 0
        }
        this.buttonFlag = false;
        this.userMenuService.addMenuItem(this.item).subscribe(iRet => {
            this.buttonFlag = true;
            if (iRet > 0) {
                this.operateResult.emit(iRet);
            } else if (iRet == 0) {
                this.messageService.add({ severity: 'info', detail: this.item.label + " 菜单信息添加失败，请重试" });
            } else {
                this.messageService.add({ severity: 'error', detail: "服务器内部出现错误，请稍后再试" });
            }
        })
    }

    goBack(): void {
        this.operateResult.emit(0);
    }

}
