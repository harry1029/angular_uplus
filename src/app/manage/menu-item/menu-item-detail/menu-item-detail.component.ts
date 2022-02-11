import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { UserMenuService } from '../../../services/system/user-menu.service';
import { MenuItem } from '../../../models/system/menu-item';

@Component({
    selector: 'app-menu-item-detail',
    templateUrl: './menu-item-detail.component.html',
    styleUrls: ['./menu-item-detail.component.css'],
    providers: [MessageService, UserMenuService]
})
export class MenuItemDetailComponent implements OnInit, OnChanges {

    @Output() private operateResult = new EventEmitter();
    @Input() menuItemId: number;
    item: MenuItem;
    parentItem: MenuItem

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private userMenuService: UserMenuService,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.parentItem = null;
        this.getItem();
    }

    //获取树节点
    private getItem() {
        this.userMenuService.getMenuItem(this.menuItemId)
            .subscribe(item => {
                this.item = item
                this.getParent()
                console.log("AAAA", item)
            });
    }

    //获取父节点
    private getParent() {
        this.userMenuService.getMenuItem(this.item.parentId)
            .subscribe(item => {
                this.parentItem = item
            });
    }

    update(): void {
        this.operateResult.emit(2);
    }
    delete(): void {
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Delete the Menu Item' });
    }

    onConfirm() {
        this.deleteMenuItem(this.item);
        this.messageService.clear('c');
    }

    deleteMenuItem(menuItem: MenuItem): void {
        this.userMenuService.deleteMenuItem(menuItem.id).subscribe(
            iRet => {
                if (iRet > 0) {
                    this.messageService.add({ severity: 'success', detail: "该菜单结点删除成功" });
                    this.operateResult.emit(4);
                } else if (iRet == -2) {
                    this.messageService.add({ severity: 'warn', detail: "非叶子结点，不能删除" });
                } else {
                    this.messageService.add({ severity: 'error', detail: "该菜单结点删除失败" });
                }
            });
    }

    onReject() {
        this.messageService.clear('c');
    }

    add(): void {
        this.operateResult.emit(3);
    }

    goBack(): void {
        this.operateResult.emit(0);
    }
}
