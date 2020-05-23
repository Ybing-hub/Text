import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Card,Row,Col } from 'antd'
import "./index.css"
import { actionCreator } from './store'
import Layout from 'common/layout'
//容器组件
class Home extends Component{
	
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handleCount();
	}
	render(){
		const {usernum,productnum,ordernum} = this.props
		return(
			<div className="Home">
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>首页</Breadcrumb.Item>
			        </Breadcrumb>
			       	<div className='content'>
			       		<Row>
			       			<Col span={8}>
					        	<Card title="用户统计" bordered={true} style={{ width: 300 }}>
							      <p>{usernum}</p>
							    </Card>
						   	</Col>
						   	<Col span={8}>
					        	<Card title="订单量" bordered={true} style={{ width: 300 }}>
							      <p>{productnum}</p>
							    </Card>
						   	</Col>
						   	<Col span={8}>
					        	<Card title="商品数量" bordered={true} style={{ width: 300 }}>
							      <p>{ordernum}</p>
							    </Card>
						   	</Col>
						</Row>
			       	</div>
				</Layout>
			</div>
		)
	}
}




//将属性映射到组件中
const mapStateToProps = (state)=>{
	return{

	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			const action = actionCreator.getCountAction()
			dispatch(action)
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)
