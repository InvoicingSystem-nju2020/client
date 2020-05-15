import { Get, Post, Put, Patch, Delete } from './Request'
import {PurchaseRecordInfo} from "./data";

// class GetPurchaseRecordsParams {
//   startPurchaseTime: string = '';
//   endPurchaseTime: string = '';
//   startCreateTime:string = '';
//   endCreateTime:string = '';
//   goodsName:string = '';
//   goodsNumber:string = '';
//   brand:string = '';
//   supplier:string = '';
//   minNumbers:number = 0;
//   maxNumbers:number = 0;
//   minRetailPrice:number = 0;
//   maxRetailPrice:number = 0;
//   minDiscount:number = 0;
//   maxDiscount:number = 0;
//   minUnitPrice:number = 0;
//   maxUnitPrice:number = 0;
//   minTotalAmount:number = 0;
//   maxTotalAmount:number = 0;
//   taxIncluded:number = -1;
//   sorter:string = '';
//   desc:number = 0;
//   startIndex:number = 0;
//   num:number = 100;
// }
export interface GetPurchaseRecordsParams {
  startPurchaseTime?: string;
  endPurchaseTime?: string;
  startCreateTime?: string;
  endCreateTime?: string;
  goodsName?: string;
  goodsNumber?: string;
  brand?: string;
  supplier?: string;
  minNumbers?: number;
  maxNumbers?: number;
  minRetailPrice?: number;
  maxRetailPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  minUnitPrice?: number;
  maxUnitPrice?: number;
  minTotalAmount?: number;
  maxTotalAmount?: number;
  taxIncluded?:number;
  sorter?: string;
  desc?: number;
  startIndex?: number;
  num?:number;
}

const PURCHASE_RECORDS_API_URL = '/api/purchase_records';

// 录入进货记录
function addPurchaseRecords(purchaseRecord: PurchaseRecordInfo) {
  return Post(
    PURCHASE_RECORDS_API_URL,
    purchaseRecord
  );
};

// 查看进货记录列表
function getPurchaseRecords(params: GetPurchaseRecordsParams) {
  return Get(
    PURCHASE_RECORDS_API_URL,
    params
  );
}

// 查询单个进货记录
function getPurchaseRecordById(id: string) {
  return Get(
    PURCHASE_RECORDS_API_URL,
    {id: id}
  );
};

// 修改进货记录
function editPurchaseRecord(id: string, purchaseRecord: PurchaseRecordInfo) {
  return Put(
    PURCHASE_RECORDS_API_URL+'/'+id,
    purchaseRecord
  );
};

// 删除进货记录
function deletePurchaseRecord(id: string) {
  return Delete(
    PURCHASE_RECORDS_API_URL+'/'+id
  );
};

export {addPurchaseRecords, getPurchaseRecords, getPurchaseRecordById, editPurchaseRecord, deletePurchaseRecord};