export interface CodeValue {
    id?: number;
    id32?: number;
    parentId?: number;
    keyCode?: string;
    operator?: string;
    description?: string;
    children?: CodeValue[];
  }