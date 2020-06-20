import React from "react";
import {UserInfo} from "../../containers/app/App";

// 用户context
export const UserContext = React.createContext<{user: UserInfo, setUser: any, logout: () => void}>({
  user: {username: "", type: "未登录"},
  setUser: () => {},
  logout: () => {},
});
