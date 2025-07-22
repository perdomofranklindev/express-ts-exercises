/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorCodes, ErrorCodesTyped } from './api-response.types';

export interface ApiSuccessResponse {
  status: 'success';
  data: any;
}

interface ApiErrorParams {
  message: string;
  code: ErrorCodes | ErrorCodesTyped;
  details?: any | null;
}

export interface ApiErrorResponse extends ApiErrorParams {
  status: 'error';
}

export class ApiResponse {
  static success(data: any): ApiSuccessResponse {
    return {
      status: 'success',
      data,
    };
  }

  static error(params: ApiErrorParams): ApiErrorResponse {
    return {
      status: 'error',
      details: null,
      ...params,
    };
  }
}
