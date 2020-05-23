import React,{Component} from 'react'
import './App.css'
import { Input,Button,Row,Col,List } from 'antd'
class APPUI extends Component{
	render(){
		return (
			<div className = 'App'>
				<Row>
					<Col span={18}>
					<Input 
						onChange={this.props.handleInput} 
						value={this.props.task}
					/>
					</Col>
					<Col span={6}>
					<Button 
						type="primary"
						onClick = {this.props.handleAdd}
					>
						提交
					</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:20}}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (
			        <List.Item onClick={()=>{this.props.handleDel(index)}}>
			          {item}
			        </List.Item>
			      )}
			    />
			</div>
		)
	}
}

export default APPUI