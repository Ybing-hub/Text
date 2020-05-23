import React,{Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './index.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {actionCreator} from './store'


class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLogin(values)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isFecthing } = this.props.isFecthing
        return (
          <div className='Login'>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-z][a-z0-9_]{2,5}$/i,message:'用户名3-6位符合要求'}]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' },{pattern:/^\w{3,6}$/i,message:'密码是3-6位任意字符'}]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                className="login-form-button"
                onClick = {this.handleSubmit}
                loading = {isFecthing}
              >
                登录
              </Button>
            </Form.Item>
            </Form>
          </div>
        );
    }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

//将属性映射到组件中
const mapStateToProps = (state)=>{
	return{
    isFecthing:state.get('login').get('isFecthing')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
  return{
    handleLogin:(values)=>{
      dispatch(actionCreator.getLoginAction(values))
    }
  }
	
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)