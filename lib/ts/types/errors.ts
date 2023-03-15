import { BaseReponse } from "./root";

export interface WellDefinedError {
  readonly type: string;
  readonly title: string;
}

export interface WideRangingError extends WellDefinedError, BaseReponse {
  readonly detail: string;
}

interface InvalidField {
  readonly field: string;
  readonly problem: string;
}

export interface ValidationError extends WellDefinedError, BaseReponse {
  readonly generalErrors: string[];
  readonly invalidFields: InvalidField[];
}