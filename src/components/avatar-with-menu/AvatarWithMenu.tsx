import React, {useState} from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {UserContext} from "../../context/usercontext/UserContext";
import {Link} from "react-router-dom";


function AvatarWithMenu() {
  return (
    <UserContext.Consumer>
      {({user, logout}) => (
        <Dropdown overlay={
                    <Menu>
                      <Menu.Item key="logout" onClick={logout}><Link to={"/login"}>登出</Link></Menu.Item>
                    </Menu>
                  }
                  trigger={['contextMenu']}
        >
          <div style={{verticalAlign: 'middle', textAlign: "center", margin: "20px 0"}}>
            <Avatar size={100}>
              {user.type}
            </Avatar>
          </div>
        </Dropdown>
      )}
    </UserContext.Consumer>
  );
}

export default AvatarWithMenu;