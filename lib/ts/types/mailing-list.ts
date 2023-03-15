import * as Yup from 'yup';
import { BaseReponse } from "./root";

export enum MailingListType {
  STANDARD = 'STANDARD',
  DYNAMIC = 'DYNAMIC',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
}

export interface MailingList extends BaseReponse {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly senderAddress: string;
  readonly senderName: string;
  readonly replyToAddress: string;
  readonly replyToName: string;
  readonly type: MailingListType;
  readonly creationDate: string;
}

export interface MailingListCollection extends BaseReponse {
  readonly _embedded?: {
    readonly 'inx:lists': MailingList[];
  }
}

export interface MailingListCount extends BaseReponse {
  readonly id: number;
  readonly count: number;
  readonly lastCalculatedAt: string;
}

const MailingListBodySchema = Yup.object({
  name: Yup.string().required().min(1).max(255),
  type: Yup.string().required().oneOf([MailingListType.STANDARD]),
  senderAddress: Yup.string().required().email(),
  senderName: Yup.string().optional(),
  replyToAddress: Yup.string().optional().email(),
  replyToName: Yup.string().optional(),
  description: Yup.string().optional().max(255),
});

export type MailingListBody = ReturnType<typeof MailingListBodySchema.validateSync>;