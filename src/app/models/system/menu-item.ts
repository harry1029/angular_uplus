export interface MenuItem {
    id: number;
    parentId?: number;
    status?: number;
    parameter?: string;
    order?: number;
    label?: string;
    icon?: string;
    url?: string;
    urlType?: number;
    styleClass?: string;
    description?: string;
    routerLink?: string;
    actionId?: number;
    items?: MenuItem[];
}
