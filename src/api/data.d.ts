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

export {GoodsAddFormData};
