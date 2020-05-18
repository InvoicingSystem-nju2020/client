/**
 * 辅助接口
 */
import {Get} from "./Request";

const ASSIST_API_URL = '/api/utils';

export function getAssistData() {
  return Get(
    ASSIST_API_URL,
    {}
  );
};
