export interface ApiInfo {
  id?: number;
  status?: number;
  apiMethod: number;
  apiPath: string;
  pathParameterRequired?: number;
  pathParameter?: string;
  queryParameter?: string;
  queryParameter1?: string;
  requestOptions?: string;
  requestBody?: string;
  requestBodyExample?: string;
  responseStatus?: string;
  responseValue?: string;
  requestExample?: string;
  authenticationRequired?: number;
  description?: string;
}
