
export interface OrgTree {
    id: number;                     //id
    parentId?: number;              //父Id
    status?: number;                //状态：0无效，1有效
    order?: number;                 //顺序号
    name?: string;                  //名称 Varchar(128)
    enName?: string;                //英文名称 Varchar(128)
    orgCode?: string;               //代码  Varchar(32)
    flag1?: number;                 //忽略该项
    divisionFlag?: number;          //分公司标记：0，1 用checkbox做
    address?: string;               //地址 Varchar(256)
    principal?: string;             //负责人 Varchar(128)
    secretary?: string;             //联系人 Varchar(128)
    phone1?: string;                //电话 Varchar(60)
    fax?: string;                   //传真 Varchar(60)
    emailAddress?: string;          //Email Varchar(128)
    webAddress?: string;            //Web网址 Varchar(128)
    description?: string;           //描述 Varchar(2048)
    organization?: OrgTree[];       //孩子结点
}



