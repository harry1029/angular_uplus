
export interface Organization {
  id: number;
  parentId?: number;
  divisionId?: number;
  type?: number;
  code?: string;
  name?: string;
  originalName?: string;
  description?: string;
}
