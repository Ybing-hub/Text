import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Table,Button } from 'antd'
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
		const { list,current,pageSize,total,handlePage,isFecthing } = this.props
		const columns = [{
		        title: '用户名',
		        dataIndex: 'username',
		        key: 'username',
		    },
		    {
		        title: '是否管理员',
		        dataIndex: 'isAdmin',
		        key: 'isAdmin',
		        render:(isAdmin)=>(isAdmin ? '是':'否')
		    },
		    {
		        title: 'email',
		        dataIndex: 'email',
		        key: 'email',
		    },
		     {
		        title: '电话',
		        dataIndex: 'phone',
		        key: 'phone',
		    },
		     {
		        title: '创建时间',
		        dataIndex: 'createdAt',
		        key: 'createdAt',
		    }
		];
		const dataSource=list.map((user)=>{
			return{
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
		return(
			<div className="CategoryList">
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
				          <Breadcrumb.Item>首页</Breadcrumb.Item>
				          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				          <Breadcrumb.Item>分类列表</Breadcrumb.Item>
				    </Breadcrumb>
				    <div className='btn'>
				    	<Link to='/category/add'><Button type="primary">新增分类</Button></Link>
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
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		isFecthing:state.get('user').get('isFecthing')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			// dispatch(actionCreator.getPageAction(page))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
