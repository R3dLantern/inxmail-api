import * as Yup from 'yup';
import {
  BaseReponse,
  BooleanAsStringSchema,
  DateAsInxmailTimestampSchema,
  IntegerListAsStringSchema,
} from "./root";

export enum MailingType {
  REGULAR_MAILING = 'REGULAR_MAILING',
  ACTION_MAILING = 'ACTION_MAILING',
  TIME_TRIGGER_MAILING = 'TIME_TRIGGER_MAILING',
  SUBSCRIPTION_TRIGGER_MAILING = 'SUBSCRIPTION_TRIGGER_MAILING',
  SPLIT_TEST_MAILING = 'SPLIT_TEST_MAILING',
}

const paramsSchema = Yup.object({
  embedSendingStatistics: Yup.boolean().optional(),
  embedResponseStatistics: Yup.boolean().optional(),
});

const collectionParamsSchema = paramsSchema.shape({
  sentAfter: DateAsInxmailTimestampSchema.optional(),
  types: Yup
    .array()
    .of(Yup.string().oneOf(Object.values(MailingType)))
    .transform((val: MailingType[]) => val.join(','))
    .optional(),
  listIds: IntegerListAsStringSchema.optional(),
  readyToSend: BooleanAsStringSchema.optional(),
  isApproved: BooleanAsStringSchema.optional(),
  hasSending: BooleanAsStringSchema.optional(),
  createdAfter: DateAsInxmailTimestampSchema.optional(),
  createdBefore: DateAsInxmailTimestampSchema.optional(),
  modifiedAfter: DateAsInxmailTimestampSchema.optional(),
  modifiedBefore: DateAsInxmailTimestampSchema.optional(),
});

export type MailingParams = ReturnType<typeof paramsSchema.validateSync>;

export type MailingCollectionParams = ReturnType<typeof collectionParamsSchema.validateSync>;

export interface Mailing extends BaseReponse {
  id: number;
  type: MailingType;
  listId: number;
  name: string;
  subject: string;
  creationDate: string;
  modificationDate: string;
  _embedded?: {
    // TODO: 'inx:sending-statistics'?: SendingStatistic;
    // TODO: 'inx:response-statistics'?: ResponseStatistic;
  }
}

export interface MailingCollection extends BaseReponse {
  _embedded?: {
    'inx:mailings': Mailing[];
  };
}
