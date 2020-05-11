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

interface SupplierInfo {
  supplierNumber: string;
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

export {GoodsAddFormData, SupplierInfo};
