import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Table,Button,Input,InputNumber,Switch } from 'antd'
import moment from 'moment'
import Layout from 'common/layout'
import "./index.css"
import { actionCreator } from './store'
import axios from 'axios'
import {
  Link,
} from "react-router-dom"
//容器组件
class CategoryList extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}

	render(){
		const { 
			list,
			current,
			pageSize,
			total,
			handlePage,
			isFecthing,
			handleUpdateName,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateIsShow
		} = this.props

		const columns = [{
		        title: '商品名称',
		        dataIndex: 'name',
		        key: 'name',
		        width:'40%',
		        render:(name,record)=>{
		        	return (<Input 
		        		style={{width:'60%'}}
		        		defaultValue={name}
		        		onBlur={(ev)=>{
		        			if(ev.target.value!=name){
		        				handleUpdateName(record._id,ev.target.value)
		        			}
		        		}}
		        	/>)
		        }
		    },
		    {
		        title: '分类名称',
		        dataIndex: 'mobileName',
		        key: 'mobileName',
		        render:(mobileName,record)=>{
		        	return (<Input 
		        		style={{width:'40%'}}
		        		defaultValue={mobileName}
		        		onBlur={(ev)=>{
		        			if(ev.target.value!=mobileName){
		        				handleUpdateMobileName(record._id,ev.target.value)
		        			}
		        		}}
		        	/>)
		        }
		    },
		    {
		        title: '是否显示',
		        dataIndex: 'isShow',
		        key:'isShow',
		        render: (isShow,record)=>{
			    	return (<Switch 
			    		checkedChildren="显示" 
			    		unCheckedChildren="隐藏" 
			    		checked={isShow=='0' ? false : true}
			    		onChange={(checked)=>{
			    			const isShow = checked ? '1' : '0'
			    			handleUpdateIsShow(record._id,isShow)
			    		}} 
			    	/>)
			    }
		    },
		     {
		        title: '排序',
		        dataIndex: 'order',
		        key: 'order',
		        render:(order,record)=>{
		        	return (<InputNumber 
		        		style={{width:'20%'}}
		        		defaultValue={order}
		        		onBlur={(ev)=>{
		        			if(ev.target.value!=order){
		        				handleUpdateOrder(record._id,ev.target.value)
		        			}
		        		}}
		        	/>)
		        }
		    }
		];
		const dataSource=list.toJS()
		return(
			<div className="CategoryList">
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				          <Breadcrumb.Item>首页</Breadcrumb.Item>
				          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				          <Breadcrumb.Item>商品列表</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className='btn'>
				    	<Link to='/product/add'><Button type="primary" className='btn add-btn'>添加商品</Button></Link>
				    </div>
				    <div className='content'>
					    <Table 
					    	dataSource={dataSource} 
					    	columns={columns}
					    	pagination={{
					    		current:current,
					    		pageSize:pageSize,
					    		total:total
					    	}}
					    	onChange={(page)=>{
					    		handlePage(page.current)
					    	}}
					    	loading={{
					    		spinning:isFecthing,
					    		tip:'数据不要命加载中，请稍后'
					    	}}
					    />
				    </div>
			    </Layout>
			</div>
		)
	}
}




//将属性映射到组件中
const mapStateToProps = (state)=>{
	return{
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		isFecthing:state.get('category').get('isFecthing')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		},
		handleUpdateName:(id,newName)=>{
			dispatch(actionCreator.getUpdateNameAction(id,newName))
		},
		handleUpdateMobileName:(id,newMobileName)=>{
			dispatch(actionCreator.getUpdateMobileNameAction(id,newMobileName))
		},
		handleUpdateOrder:(id,order)=>{
			dispatch(actionCreator.getUpdateOrderAction(id,order))
		},
		handleUpdateIsShow:(id,neWIsShow)=>{
			dispatch(actionCreator.getUpdateIsShowAction(id,neWIsShow))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
