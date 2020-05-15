import { Get, Post, Put, Patch, Delete } from './Request'
import {SupplierInfo} from "./data";

export interface GetSuppliersParams {
  supplierNumber?: string;
  supplierName?: string;
  productionCategory?: string;
  purchasingCategories?: string;
  contact?: string;
  contactInformation?: string;
  mail?: string;
  sex?: number;
  sorter?: string;
  desc?: number;
  startIndex?: number;
  num?: number;
}

const SUPPLIER_API_URL = '/api/suppliers';

// 录入进货记录
function addSupplier(supplier: SupplierInfo) {
  return Post(
    SUPPLIER_API_URL,
    supplier
  );
};

// 查看供应商列表
function getSuppliers(params: GetSuppliersParams) {
  return Get(
    SUPPLIER_API_URL,
    params
  );
}

// 查询单个供应商
function getSupplierByNumber(supplierNumber: string) {
  return Get(
    SUPPLIER_API_URL,
    {supplierNumber: supplierNumber}
  );
};

// 修改供应商
function editSupplier(supplierNumber: string, supplier: SupplierInfo) {
  return Put(
    SUPPLIER_API_URL+'/'+supplierNumber,
    supplier
  );
};

// 删除供应商
function deleteSupplier(supplierNumber: string) {
  return Delete(
    SUPPLIER_API_URL+'/'+supplierNumber
  );
};

export {addSupplier, getSuppliers, getSupplierByNumber, editSupplier, deleteSupplier};
