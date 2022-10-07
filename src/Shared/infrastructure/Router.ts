export enum AllowedMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface Router {
  method: AllowedMethods;
  path: string;
  handlerName: string | symbol;
}