import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'common/layout'
import { Breadcrumb,Button,Form, Select, Input,InputNumber} from 'antd'
import { actionCreator } from './store'
import './index.css'
import  UploadImage  from 'common/upload-image'
import  RichSimditor  from 'common/rich-editor'
import { UPLOAD_PRODUCT_IMAGE } from 'api/config.js'
const { Option } = Select;

class ProductAdd extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {

		}
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
				          <Breadcrumb.Item>添加商品</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className='content'>
				    	<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
					        <Form.Item label="商品分类">
					          {getFieldDecorator('category', {
					            rules: [{ required: true, message: '请选择商品分类!' }],
					          })(
					            <Select
					              placeholder="请选择商品分类"
					            >
					             {
					             	categories.map((category)=>{
					             		return <Option key={category.get('_id')}>{category.get('name')}</Option>
					             	})
					            }
					            </Select>
					          )}
					        </Form.Item>
					         <Form.Item label="商品名称">
					          {getFieldDecorator('name', {
					            rules: [{ required: true, message: '请输入商品名称' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品描述">
					          {getFieldDecorator('detail', {
					            rules: [{ required: true, message: '商品描述' }],
					          })(<Input />)}
					        </Form.Item>
					        <Form.Item label="商品价格">
					          {getFieldDecorator('price', {
					            rules: [{ required: true, message: '商品价格' }],
					          })(<InputNumber min={0}/>)}
					        </Form.Item>
					        <Form.Item label="商品库存">
					          {getFieldDecorator('stock', {
					            rules: [{ required: true, message: '商品库存' }],
					          })(<InputNumber min={0}/>)}
					        </Form.Item>
					        <Form.Item label="封面图片">
					        	<UploadImage
					        		max={1}
					        		action={UPLOAD_PRODUCT_IMAGE}
					        		getFileList = {(fileList)=>{
					        			console.log(fileList)
					          			// handleMainImage(fileList)
					          		}}
					        	/>
					        </Form.Item>
					        <Form.Item label="详情图片">
					          	<UploadImage
					        		max={5}
					        		action={UPLOAD_PRODUCT_IMAGE}
					        		getFileList = {(fileList)=>{
					        			console.log(fileList)
					          			// handleMainImage(fileList)
					          		}}
					        	/>
					        </Form.Item>
					        <Form.Item label="商品详情">
					        	<RichSimditor/>
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