import axios, { AxiosInstance } from "axios";
import * as mailingList from './routes/mailing-list';
import * as mailing from './routes/mailing';
import { ListSettingsBody, ListSettingsName, MailingList, MailingListBody, MailingListCollection, MailingListCount } from "./types/mailing-list";
import { Mailing, MailingCollection, MailingCollectionParams, MailingParams } from "./types/mailing";

class InxmailAPI {
  #client: AxiosInstance;
  #account: string;

  constructor(account: string, password: string) {
    this.#account = account;
    this.#client = axios.create({
      baseURL: `https://api.inxmail.com/${this.#account}/rest/v1`,
      headers: {
        Authorization: `Basic ${btoa(`${account}:${password}`)}`,
      },
    });
  }

  async getMailingList(id: number): Promise<MailingList> {
    return mailingList.get(this.#client, id);
  }
  
  async getMailingListCollection(
    createdBefore?: Date,
    createdAfter?: Date
  ): Promise<MailingListCollection> {
    return mailingList.getList(this.#client, createdBefore, createdAfter);
  }

  async createMailingList(body: MailingListBody): Promise<MailingList> {
    return mailingList.create(this.#client, body);
  }

  async updateMailingList(id: number, body: MailingListBody): Promise<MailingList> {
    return mailingList.updateOne(this.#client, id, body);
  }

  async deleteMailingList(id: number): Promise<void> {
    await mailingList.deleteOne(this.#client, id);
  }

  async getMailingListRecipientCount(id: number): Promise<MailingListCount> {
    return mailingList.getCount(this.#client, id);
  }

  async updateMailingListSetting(
    id: number,
    settingName: ListSettingsName,
    body: ListSettingsBody
  ): Promise<void> {
    await mailingList.updateSettings(this.#client, id, settingName, body);
  }

  async getMailing(id: number, params?: MailingParams): Promise<Mailing> {
    return mailing.get(this.#client, id, params);
  }

  async getMailingCollection(params?: MailingCollectionParams): Promise<MailingCollection> {
    return mailing.getList(this.#client, params);
  }
}

export default InxmailAPI;