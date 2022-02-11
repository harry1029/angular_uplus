import { AddressInfo } from './address-info';
import { Organization } from './organization';

export interface PersonalInfo {
  id: number;	                //userId
  personalId: number;         //personalId, t.id
  userType?: number;          //用户类型, 
  profilePic?: string;        //头像路径, 
  profilePicId?: number;      //头像Id
  firstName?: string;         //名, t.first_name
  lastName?: string;          //姓, t.last_name
  sex?: number;               //性别，1-男，2-女, t.sex
  birthDay?: Date;            //生日, t.birth_day
  phoneNumber?: string;       //电话, 
  phoneNumberConfirmed?: number;//电话是否已验证，0-否，1-是, 
  email?: string;             //Email, 
  emailConfirmed?: number;    //Email是否已验证，0-否，1-是, 
  driveDegree?: number;       //驾照等级, t.flag1
  trainerFlag?: number;       //教练标记, t.flag2
  partnerFlag?: number;       //陪练标记, t.flag3
  trainerStars?: number;      //星级（1 - 5）, t.flag4
  languages?: number[];       //语言, 
  LanguageNames?: string;     //语言, 
  addressInfo?: AddressInfo;      //地址信息
  organization?: Organization;    //单位信息
}
