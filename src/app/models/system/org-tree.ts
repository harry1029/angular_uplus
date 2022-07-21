import { AddressInfo } from './address-info';

export interface OrgTree {
  id: number;                     //id
  parentId?: number;              //父Id
  deleteFlag?: number;            //删除标记
  status?: number;                //状态：0无效，1有效
  type?: number;
  code?: string;                  //代码  Varchar(32)
  name?: string;                  //名称 Varchar(128)
  originalName?: string;          //英文名称 Varchar(128)
  sequence?: number;              //顺序号
  personInCharge?: string;        //负责人 Varchar(128)
  contact?: string;               //联系人 Varchar(128)
  phone1?: string;                //电话 Varchar(60)
  fax?: string;                   //传真 Varchar(60)
  email?: string;                 //Email Varchar(128)
  website?: string;               //Web网址 Varchar(128)
  Note?: string;                  //
  flag?: number;                  //忽略该项
  description?: string;           //描述 Varchar(2048)
  addressInfo?: AddressInfo;      //地址 Varchar(256)
  organizations?: OrgTree[];      //孩子结点
}



