import { Get, Post, Put, Patch, Delete } from './Request'
import {OrderInfo} from "./data";

export interface GetOrdersParams {
  startTime?: string;
  endTime?: string;
  clientName?: string;
  salesPerson?: string;
  goodsName?: string;
  goodsNumber?: string;
  brand?: string;
  minTotalAmount?: number;
  maxTotalAmount?: string;
  state?: string[];
  writeAnInvoice?: number
  sorter?: string;
  desc?: number;
  startIndex?: number;
  num?: number;
}

const ORDER_API_URL = '/api/orders';

// 录入订单
export function addOrder(order: OrderInfo) {
  return Post(
    ORDER_API_URL,
    order
  );
};

// 查看订单列表
export function getOrders(params: GetOrdersParams) {
  return Get(
    ORDER_API_URL,
    params
  );
}

// 查询单个订单
export function getOrderByNumber(orderNumber: string) {
  return Get(
    ORDER_API_URL,
    {orderNumber: orderNumber}
  );
};

// 修改订单
export function editOrder(orderNumber: string, order: OrderInfo) {
  return Put(
    ORDER_API_URL+'/'+orderNumber,
    order
  );
};

// 删除订单
export function deleteOrder(orderNumber: string) {
  return Delete(
    ORDER_API_URL+'/'+orderNumber
  );
};

// 更改订单状态
export function updateOrderState(orderNumberList: string[], state: string) {
  return Patch(
    ORDER_API_URL+'/state',
    {
      orderNumberList: orderNumberList,
      state: state
    }
  );
};
