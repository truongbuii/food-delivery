interface IApiDataResponse<T> {
  code: number;
  message?: string;
  data?: T;
}

interface IApiErrorResponse {
  code: number;
  message: string;
}

interface IToken {
  token: string;
}

export type { IApiDataResponse, IApiErrorResponse, IToken };
