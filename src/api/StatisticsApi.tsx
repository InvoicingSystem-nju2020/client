import {Get} from './Request'

const STATISTICS_API_URL = '/api/statistics';

/**
 * 获取日报接口
 * @param params {date?: 日期}
 */
export function getDailyStatistics(params: {date?: string}) {
  return Get(
    STATISTICS_API_URL+'/daily',
    params
  );
};

/**
 * 获取周报接口
 * @param params {date?: 日期}
 */
export function getWeeklyStatistics(params: {date?: string}) {
  return Get(
    STATISTICS_API_URL+'/weekly',
    params
  );
};

/**
 * 获取月报接口
 * @param params {date?: 月份}
 */
export function getMonthlyStatistics(params: {month?: string}) {
  return Get(
    STATISTICS_API_URL+'/monthly',
    params
  );
};