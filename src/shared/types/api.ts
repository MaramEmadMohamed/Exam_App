export interface ISuccessResponse<T> {
  status: true;
  code: number;
  payload: T;
}

export interface IErrorResponse<R> {
  status: false;
  code: number;
  message: string;
  errors: R[];
}

export type IApiResponse<T = unknown, R = unknown> = ISuccessResponse<T> | IErrorResponse<R>;