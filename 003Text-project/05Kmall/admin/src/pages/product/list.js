import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Table,Button,Input,InputNumber,Switch,Divider } from 'antd'
import moment from 'moment'
import Layout from 'common/layout'
import "./index.css"
import { actionCreator } from './store'
import axios from 'axios'
import {
  Link,
} from "react-router-dom"
//容器组件
class ProductList extends Component{
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
			keyword,
			handleUpdateIsShow,
			handleUpdateStatus,
			handleUpdateIsHot,
			handleUpdateOrder,
		} = this.props

		const columns = [
			{	
		        title: '商品',
			    dataIndex: 'name',
			    key: 'name',
			    width:'20%',
			    render:(name)=>{
			    	if(keyword){
			    		///keyword/ig
			    		let reg = new RegExp(keyword,'ig')
			    		let newName = name.replace(reg,'<b style="color:red;">'+keyword+'</b>')
			    		return <div dangerouslySetInnerHTML={{__html: newName}}></div>
			    	}else{
			    		return name
			    	}
			    	
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
		        title: '上/下架',
		        dataIndex: 'status',
		        key:'status',
		        render: (status,record)=>{
			    	return (<Switch 
			    		checkedChildren="显示" 
			    		unCheckedChildren="隐藏" 
			    		checked={status=='0' ? false : true}
			    		onChange={(checked)=>{
			    			const status = checked ? '1' : '0'
			    			handleUpdateStatus(record._id,status)
			    		}} 
			    	/>)
			    }
		    },
		    {
		        title: '是否热卖',
		        dataIndex: 'isHot',
		        key:'isHot',
		        render: (isHot,record)=>{
			    	return (<Switch 
			    		checkedChildren="显示" 
			    		unCheckedChildren="隐藏" 
			    		checked={isHot=='0' ? false : true}
			    		onChange={(checked)=>{
			    			const isHot = checked ? '1' : '0'
			    			handleUpdateIsHot(record._id,isHot)
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
		    },
		    {
		    	title:'操作',
		    	render:(text,record)=>{
		    		return (
		    			<span>
			    			<Link to={'/product/add/'+record._id}>编辑</Link>	
		  					<Divider type="vertical" />
		  					<Link to={'/product/detail/'+record._id}>查看</Link>	
			    		</span>
		    		)
		    	}
		    }
		];
		const dataSource=list.toJS()
		return(
			<div className="ProductList">
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
					    	rowKey='_id'
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
		list:state.get('product').get('list'),
		current:state.get('product').get('current'),
		pageSize:state.get('product').get('pageSize'),
		total:state.get('product').get('total'),
		isFecthing:state.get('product').get('isFecthing')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		},
		handleUpdateIsShow:(id,newIsShow)=>{
			dispatch(actionCreator.getUpdateIsShowAction(id,newIsShow))
		},
		handleUpdateStatus:(id,newStatus)=>{
			dispatch(actionCreator.getUpdateStatusAction(id,newStatus))
		},
		handleUpdateIsHot:(id,newIsHot)=>{
			dispatch(actionCreator.getUpdateIsHotAction(id,newIsHot))
		},
		handleUpdateOrder:(id,newOrder)=>{
			dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
