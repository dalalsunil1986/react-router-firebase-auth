import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../helpers/auth';
import { Menu, Button } from 'antd';

const SubMenu = Menu.SubMenu;

export default class MainNav extends Component {
  render() {
    const props = { ...this.props };
    return (
      <Menu
        theme="dark"
        onClick={this.props.handleClick}
        selectedKeys={this.props.currentNavPath}
        mode="horizontal"
        style={{
          lineHeight: '64px'
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        {props.authed ? (
          <Menu.Item key="users">
            <Link to="/users">Users</Link>
          </Menu.Item>
        ) : (
          <Menu.Item />
        )}
        {props.authed ? (
          <Menu.Item style={{ float: 'right' }} key="Logout">
            <Button
              type="primary"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <SubMenu
            title={<span className="submenu-title-wrapper">Account</span>}
            style={{ float: 'right' }}
          >
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    );
  }
}
