import React,{Component} from 'react'
import { Layout, Menu, Icon } from 'antd';
import { NavLink,Link } from "react-router-dom";
import './index.css'

const { SubMenu } = Menu;
const {  Sider } = Layout;

class AdminSider extends Component {
    render() {
        return (
          <div className='AdminSider'>
            <Sider width={200} style={{ background: '#fff',minHeight:780 }}>
              <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
              >
                  <Menu.Item key="1">
                      <NavLink exact to='/'>首页</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                      <NavLink to='/user'>用户列表</NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                      <NavLink to='/category'>分类管理</NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                      <NavLink to='/product'>商品管理</NavLink>
                  </Menu.Item>
                  <Menu.Item key="5">
                      <NavLink to='/ad'>广告管理</NavLink>
                  </Menu.Item>              
              </Menu>
            </Sider>
          </div>
        )
    }
}
export default AdminSider