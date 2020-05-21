import { Get, Post, Put, Patch, Delete } from './Request'
import {GoodsInfo} from "./data";

export interface GetGoodsParams {
  goodsNumber?: string;
  goodsName?: string;
  abbreviation?: string;
  brand?: string[];
  model?: string;
  goodsNo?: string;
  material?: string;
  colour?: string;
  type?: string[];
  place?: string[];
  minRetailPrice?: number;
  maxRetailPrice?: number;
  sorter?: string;
  desc?: number;
  startIndex?: number;
  num?: number;
}

const GOODS_API_URL = '/api/goods';

// 录入商品
function addGoods(goods: GoodsInfo) {
  return Post(
    GOODS_API_URL,
    goods
  );
};

// 查看商品列表
function getGoods(params: GetGoodsParams) {
  return Get(
    GOODS_API_URL,
    params
  );
}

// 查询单个商品
function getGoodsByNumber(goodsNumber: string) {
  return Get(
    GOODS_API_URL+'/'+goodsNumber,
    {}
  );
};

// 修改商品
function editGoods(goodsNumber: string, goods: GoodsInfo) {
  return Put(
    GOODS_API_URL+'/'+goodsNumber,
    goods
  );
};

// 删除商品
function deleteGoods(goodsNumber: string) {
  return Delete(
    GOODS_API_URL+'/'+goodsNumber
  );
};

export {addGoods, getGoods, getGoodsByNumber, editGoods, deleteGoods};
