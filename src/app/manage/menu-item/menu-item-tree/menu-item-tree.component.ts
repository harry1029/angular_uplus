import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { UserMenuService } from '../../../services/system/user-menu.service';
import { MenuItem } from '../../../models/system/menu-item';
import { TreeNode } from '../../../models/system/tree-node';

@Component({
    selector: 'app-menu-item-tree',
    templateUrl: './menu-item-tree.component.html',
    styleUrls: ['./menu-item-tree.component.css'],
    providers: [MessageService, UserMenuService],
})
export class MenuItemTreeComponent implements OnInit {

    items: MenuItem[]   //保存获取到的menu
    treeNodes: TreeNode[]   //保存tree
    selectedNode: TreeNode;
    operationFlag: number; //1-详细，2-更新，3-增加, 4-删除成功

    constructor(
        private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private userMenuService: UserMenuService,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.getUserMainMenu()
    }

    //从服务器获取树
    private getUserMainMenu() {
        this.userMenuService.getUserMainMenu(0)
            .subscribe(userMenu => {
                this.items = userMenu.items;
                this.defined()
            })
    }

    /*.......................................................................................*/
    //将menu的属性赋值到tree，方便用tree来显示JSON数据
    private exchange(menu: MenuItem[]): TreeNode[] {
        let data: TreeNode[] = []
        for (let i = 0; i < menu.length; i++) {
            var node: TreeNode = {
                id: menu[i].id,
                label: menu[i].label,
                children: null
            }
            data[i] = node;
            if (menu[i].items != null) {
                node.children = this.exchange(menu[i].items);
            }
        }
        return data;
    }

    private defined() {
        this.treeNodes = this.exchange(this.items)
    }

    /*.....................................................................................*/

    expandAll() {
        this.treeNodes.forEach(node => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.treeNodes.forEach(node => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    nodeSelect(event) {
        if (this.selectedNode == null || this.selectedNode.id == null || this.selectedNode.id < 0) {
            this.operationFlag = 0;
            return
        }
        this.operationFlag = 1;
    }

    goBack(): void {
        this.location.back();
    }

    fromChild(operateResult: number) {
        if (this.operationFlag == 1) {
            if (operateResult == 4) {
                this.messageService.add({ severity: 'success', detail: this.selectedNode.label + " 菜单信息删除成功" });
                this.selectedNode.label = "已删除 - " + this.selectedNode.label;
                this.selectedNode.id = -1;
                operateResult = 0;
            }
            this.operationFlag = operateResult;
            return;
        } else if (this.operationFlag == 2 && operateResult > 0) {
            this.userMenuService.getMenuItem(operateResult).subscribe(userMenu => {
                this.selectedNode.label = userMenu.label;
                this.messageService.add({ severity: 'success', detail: this.selectedNode.label + " 菜单信息更新成功" });
            })
        } else if (this.operationFlag == 3 && operateResult > 0) {
            this.userMenuService.getMenuItem(operateResult).subscribe(userMenu => {
                var node: TreeNode = {
                    id: userMenu.id,
                    label: userMenu.label,
                    children: null
                }
                if (this.selectedNode.children == null) {
                    this.selectedNode.children = [node]
                } else {
                    this.selectedNode.children.push(node)
                }
                this.selectedNode = node;
                this.messageService.add({ severity: 'success', detail: this.selectedNode.label + " 菜单信息添加成功" });
            })
        }
        this.operationFlag = 1;
    }
}
