import { AxiosResponse, AxiosInstance } from "axios";
import { Mailing, MailingCollection, MailingCollectionParams, MailingParams } from "../types/mailing";
import { transformParameters } from "../util/params";

const PATH = '/mailings';

async function get(_axios: AxiosInstance, id: number, params?: MailingParams): Promise<Mailing> {
  const { data }: AxiosResponse<Mailing> = await _axios.get(
    `${PATH}/${id}`,
    { params: transformParameters(params) },
  );
  return data;
}

async function getList(
  _axios: AxiosInstance,
  params?: MailingCollectionParams,
): Promise<MailingCollection> {
  const { data }: AxiosResponse<MailingCollection> = await _axios.get(
    PATH,
    { params: transformParameters(params) }
  );
  return data;
}

export {
  get,
  getList,
}