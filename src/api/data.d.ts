/**
 * api接口数据格式
 */

interface GoodsAddFormData {
  goodsName: string;
  abbreviation: string;
  brand: string;
  model: string;
  goodsNo: string;
  material: string;
  colour: string;
  type: string;
  specifications: string;
  unit: string;
  weight: string;
  retailPrice: number;
  placeOfProduction: string;
  qualityGuaranteePeriod: number;
  remarks: string;
}

// 供应商信息
interface SupplierInfo {
  supplierNumber?: string;
  supplierName: string;
  contactInformation: string;
  remarks: string;
  productionCategory: string;
  purchasingCategories: string;
  legalPerson: string;
  contact: string;
  sex: string;
  post: string;
  mail: string;
}

// 客户信息
interface ClientInfo {
  clientsNumber: string;
  clientsName: string;
  clientsType: string;
  clientsContact: string;
  clientsSex: string;
  clientsPost: string;
  contactInformation: string;
  mail: string;
  remarks: string;
  other: string;
}

// 商品信息
interface GoodsInfo {
  goodsNumber?: string;
  goodsName: string;
  abbreviation: string;
  brand: string;
  model: string;
  goodsNo: string;
  material: string;
  colour: string;
  type: string;
  specifications: string;
  unit: string;
  weight: string;
  weightNum: number;
  weightUnit: string;
  retailPrice: number;
  placeOfProduction: string;
  qualityGuaranteePeriod: number;
  remarks: string;
}

interface PurchaseRecordInfo {
  id?: string;
  purchaseTime: moment;
  goodsNumber: string;
  numbers: number;
  discount: number;
  unitPrice: number;
  totalAmount: number;
  taxIncluded: number;
  precautionsForPreservation: string;
  supplierNumber: string;
  remarks: string;
}

interface OrderInfo {
  orderNumber?: string;
  state: string;
  salesPerson: string;
  clientNumber: string;
  writeAnInvoice: number;
  goodsNumber: string;
  finalPrice: number;
  numbers: number;
  totalAmount: number;
  typeOfPayment: string;
  typeOfShipping: string;
}

export interface AssistData {
  goodsTypes: string[];
  brands: string[];
  places: string[];
  clientTypes: string[];
  orderStates: string[];
  typesOfPayment: string[];
  typesOfShipping: string[];
}

export {GoodsAddFormData, SupplierInfo, ClientInfo, GoodsInfo, PurchaseRecordInfo, OrderInfo};
