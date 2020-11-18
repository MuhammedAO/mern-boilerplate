import React from 'react';
import { Menu } from 'antd';


export function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
  </Menu>
  )
}


