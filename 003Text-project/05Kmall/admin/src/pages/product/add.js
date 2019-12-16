import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout'
import { Breadcrumb,Button,Form, Select, Input} from 'antd'
import { actionCreator } from './store'
import './index.css'
const { Option } = Select;

class ProductAdd extends Component{
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
			<div className='ProductAdd'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				          <Breadcrumb.Item>首页</Breadcrumb.Item>
				          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				          <Breadcrumb.Item>新增商品</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className='content'>
				    	
				    </div>
				</Layout>
			</div>
		)
	}
}
const WrappedProductAdd = Form.create({ name: 'coordinated' })(ProductAdd)

const mapStateToProps = (state)=>{
	return{
		categories:state.get('product').get('categories')
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

export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductAdd)