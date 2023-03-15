import { AxiosResponse, AxiosInstance } from "axios";
import {
  MailingList,
  MailingListBody,
  MailingListCollection,
  MailingListCount,
} from "../types/mailing-list";
import { formatTimestamp } from "../util/date-time";

const PATH = '/lists';

async function get(_axios: AxiosInstance, id: number): Promise<MailingList> {
  const { data }: AxiosResponse<MailingList> = await _axios.get(`${PATH}/${id}`);
  return data;
}

async function getList(
  _axios: AxiosInstance,
  createdBefore?: Date,
  createdAfter?: Date,
): Promise<MailingListCollection> {
  const params = new URLSearchParams();
  if (createdBefore || createdAfter) {  
    if (createdBefore) {
      params.append('createdBefore', formatTimestamp(createdBefore));
    }
    if (createdAfter) {
      params.append('createdAfter', formatTimestamp(createdAfter));
    }
  }
  const { data }: AxiosResponse<MailingListCollection> = await _axios.get(PATH, { params });
  return data;
}

async function create(
  _axios: AxiosInstance,
  body: MailingListBody,
): Promise<MailingList> {
  const { data }: AxiosResponse<MailingList> = await _axios.post(PATH, body);
  return data;
}

async function updateOne(
  _axios: AxiosInstance,
  id: number,
  body: MailingListBody
): Promise<MailingList> {
  const { data }: AxiosResponse<MailingList> = await _axios.put(`${PATH}/${id}`, body);
  return data;
}

async function deleteOne(_axios: AxiosInstance, id: number): Promise<void> {
  await _axios.delete(`${PATH}/${id}`);
}

async function getCount(_axios: AxiosInstance, id: number): Promise<MailingListCount> {
  const { data }: AxiosResponse<MailingListCount> = await _axios.get(`${PATH}/${id}/count`);
  return data;
}

export {
  get,
  getList,
  create,
  updateOne,
  deleteOne,
  getCount,
}

