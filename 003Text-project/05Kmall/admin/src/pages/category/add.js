import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout'
import { Breadcrumb,Button,Form, Select, Input} from 'antd'
import { actionCreator } from './store'
import './index.css'
const { Option } = Select;

class CategoryAdd extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.props.handleLevel()
	}
	handleSubmit(e){
	e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	        if (!err) {
	            this.props.handleAdd(values)
	        }
	    })
	}
	handleSelectChange(value){
		this.props.form.setFieldsValue({
		    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		})
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { categories } = this.props
		return(
			<div className='CategoryAdd'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				          <Breadcrumb.Item>首页</Breadcrumb.Item>
				          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				          <Breadcrumb.Item>新增分类</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className='content'>
						<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        <Form.Item label="父级分类">
					          {getFieldDecorator('pid', {
					            rules: [{ required: true, message: '请选择分类名称!' }],
					          })(
					            <Select
					              placeholder="请选择分类名称"
					            >
					              <Option value="0">根分类</Option>
					             {
					             	categories.map((category)=>{
					             		return <Option key={category.get('_id')}>{category.get('name')}</Option>
					             	})
					            }
					            </Select>
					          )}
					        </Form.Item>
					         <Form.Item label="分类名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入分类名称' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="手机端分类名称">
					          {getFieldDecorator('mobileName', {
					            rules: [{ required: true, message: '手机端分类名称' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
					          <Button type="primary" onClick={this.handleSubmit}>
					            提交
					          </Button>
					        </Form.Item>
					    </Form>
				    </div>
				</Layout>
			</div>
		)
	}
}
const WrappedCategoryAdd = Form.create({ name: 'coordinated' })(CategoryAdd)

const mapStateToProps = (state)=>{
	return{
		categories:state.get('category').get('categories')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleAdd:(values)=>{
			dispatch(actionCreator.getCategoriesAddAction(values))
		},
		handleLevel:()=>{
			dispatch(actionCreator.getCategoriesLevelAction())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd)