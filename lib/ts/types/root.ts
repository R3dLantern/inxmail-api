import * as Yup from 'yup';
import { formatTimestamp } from '../util/date-time';

export interface Link {
  readonly href: string;
}

export interface Cury extends Link {
  readonly name: string;
  readonly templated: boolean;
}

export interface LinksCollection {
  readonly _self: Link;
  readonly [key: string]: Link | Cury[];
  readonly curies: Cury[];
}

export interface BaseReponse {
  readonly _links: LinksCollection;
}

export const BooleanAsStringSchema = Yup
  .boolean()
  .transform((val: boolean) => val ? 'true' : 'false');

export const DateAsInxmailTimestampSchema = Yup
  .date()
  .transform((val: Date) => formatTimestamp(val));

export const IntegerListAsStringSchema = Yup
  .array()
  .of(Yup.number().integer().required())
  .transform((val: number[]) => val.join(','));
