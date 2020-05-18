import { Get, Post, Put, Patch, Delete } from './Request'
import {ClientInfo} from "./data";

export interface GetClientParams {
  clientsNumber?: string;
  clientsName?: string;
  clientsType?: string[];
  contact?: string;
  contactInformation?: string;
  mail?: string;
  sex?: number;
  sorter?: string;
  desc?: number;
  startIndex?: number;
  num?: number;
};

export interface GetClientBalanceRecordsParams {
  startMonth?: string;
  endMonth?: string;
  startRemittanceDate?: string;
  endRemittanceDate?: string;
  minRemittanceAmount?: number;
  maxRemittanceAmount?: number;
  minPurchaseAmount?: number;
  maxPurchaseAmount?: number;
  startIndex?: number;
  num?: number;
};

const CLIENT_API_URL = '/api/clients';

// 录入客户
function addClient(client: ClientInfo) {
  return Post(
    CLIENT_API_URL,
    client
  );
};

// 查看客户列表
function getClients(params: GetClientParams) {
  return Get(
    CLIENT_API_URL,
    params
  );
}

// 查询单个客户
function getClientByNumber(clientNumber: string) {
  return Get(
    CLIENT_API_URL,
    {clientNumber: clientNumber}
  );
};

// 修改客户
function editClient(clientNumber: string, client: ClientInfo) {
  return Put(
    CLIENT_API_URL+'/'+clientNumber,
    client
  );
};

// 删除客户
function deleteClient(clientNumber: string) {
  return Delete(
    CLIENT_API_URL+'/'+clientNumber
  );
};

// 获取客户的汇款信息
function getClientBalanceRecords(clientNumber: string, params: GetClientBalanceRecordsParams) {
  return Get(
    CLIENT_API_URL+'/'+clientNumber+'/clientBalanceRecords',
    params
  )
};

export {addClient, getClients, getClientByNumber, editClient, deleteClient, getClientBalanceRecords};
