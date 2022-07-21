export interface ProductInfo {
  id: number;
  status?: number;        //activated or inactivated
  type?: number;          //X
  code: string;           //课程代码, Unique, not null
  name: string;           //课程名称, not null
  originalName: string;   //课程原文名称
  sequence?: number;      //序号
  category?: number;      //分类, 100030
  flag?: number;          //X
  description?: string;   //课程说明
}
