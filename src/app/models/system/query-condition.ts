import { CodeValue } from "./code-value";

export interface QueryCondition {
	whereAnd?: CodeValue[];
	whereOr?: CodeValue[];
	orderBy?: CodeValue[];
	pageNumber?: number;
	pageSize?: number;
}
