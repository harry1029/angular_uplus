import { AddressInfo } from './address-info';
import { Organization } from './organization';

export interface PersonInfo {
  id: number;	                  //userId
  userType?: number;              //X用户类型, 
  userCode?: string;              //登录名,仅可显示，不可修改
  loginPhone?: string;            //登录电话,仅可显示，不可修改
  nickname?: string;              //X用户昵称,
  profilePic?: string;            //头像路径,
  profilePicId?: number;          //X头像Id
  idNumber?: string;              //X证件号码, 
  firstName: string;              //名,
  lastName?: string;              //姓, 
  preferredName?: string;         //
  gender?: number;                //性别
  birthDate?: Date;               //X生日, 
  phoneAreaId?: number;           //电话国际区号id,参看电话登录程序
  phoneNumber?: string;           //电话号码, 规范格式
  phone?: string;                 //电话号码, 可用于显示
  phoneConfirmed?: number;        //电话是否已验证，0-否，1-是, 
  email?: string;                 //Email, 
  emailConfirmed?: number;        //Email是否已验证，0-否，1-是,
  phone2?: string;                //电话2
  fax?: string;                   //x传真
  emContact?: string;             //紧急联系人
  emPhone?: string;               //紧急联系电话
  contact1?: string;              //X联系方式1
  contact2?: string;              //X联系方式2
  selfInfo?: string;              //自我介绍
  subscriptionFlag?: number;      //订阅标志，0-否，1-是,
  flag?: number;                  //X
  poStatus?: number;              //X
  poType?: number;                //X
  poCode?: string;                //X
  position?: string;              //职位,
  title?: string;                 //X头衔,
  startDate?: Date;               //入职日期
  endDate?: Date;                 //X
  workCrewId?: number;            //X
  languages?: number[];           //语言
  description?: string;           //简介
  addressInfo?: AddressInfo;      //地址信息
  organization?: Organization;    //单位信息
  personId?: number;               //person id
  organizationId?: number;         //
  addressId?: number;              //
}
