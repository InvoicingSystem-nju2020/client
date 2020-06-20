import React from "react";
import {Form, Input} from "antd";

function Login() {

  return (
    <div>
      <Form name="invoicing-system-login">
        <Form.Item name="username">
          <Input/>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;