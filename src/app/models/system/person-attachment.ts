export interface PersonAttachment {
  id: number;                 //
  personId?: number;          //Person Id
  status?: number;            //状态: 1-有效, 0-无效
  type?: number;              //附件用途类型，100021
  name?: string;              //附件名称
  sequence?: number;          //顺序号
  url?: string;               //url
  attachmentId?: number;      //附件Id
  attachmentIconPath?: string;//附件图标路径
  fileType?: number;          //附件文件类型, 1-图片，2-视频，10-Text，11-Word，12-PPT，12-Excel，15-PDF
  description?: string;       //说明
}

