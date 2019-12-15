import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon,Dropdown } from 'antd';
import './index.css'
import { getUsername,romoveUsername } from 'util'
import axios from 'axios'
import api from 'api'

const { SubMenu } = Menu;
const { Header } = Layout;
  

class AdminHeader extends Component {
    constructor(props){
      super(props)
      this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
      console.log('aaa')
      api.logOut()
      .then(result=>{
        console.log(result)
        if (result.data.code == 0) {
          romoveUsername()
          window.location.href = '/login'
        }
      })
      .catch(err=>{
        console.log(err)
      })
      /*
      axios({
        method:'delete',
        url:'http://127.0.0.1:3000/sessions/users'
      })
      .then(result=>{
        console.log(result)
        if (result.data.code == 0) {
          romoveUsername()

          window.location.href = '/login'
        }
      })
      .catch(err=>{
        console.log(err)
      })
      */
    }
    render() {
      const menu = (
        <Menu>
          <Menu.Item key="0" onClick={this.handleLogout}>
              <Icon type="logout" />退出
          </Menu.Item>
        </Menu>
      )
      return(
          <div className='AdminHeader'>
            <Header className="header">
              <div className="logo">
                Kmall后台管理中心
              </div>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="drop-down" href="#">
                  {getUsername()}<Icon type="down" />
                </a>
              </Dropdown>
            </Header>
          </div>
      )
    }
}
export default AdminHeader
