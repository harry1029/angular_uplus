export interface FaqInfo {
  id: number;
  status?: number; //activated or inactivated
  type?: number; //X
  sequence?: number; //序号
  question: string; //问题
  answer?: string; //回答
  issueTime?: Date; //X
  endTime?: Date; //X
  submitTime?: number; //X
  flag?: number; //X
  description?: string; //备注
}
