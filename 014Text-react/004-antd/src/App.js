import React,{Component,Fragment} from 'react'
import './App.css'
// import 'antd/dist/antd.css'
import Item from './Item.js'
import { DatePicker,Input,Button,Row,Col,List } from 'antd';

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			list:['吃饭','烤串','扎啤'],
			task:''
		}
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		const list = [...this.state.list,this.state.task]
		this.setState((preState)=>({
			list:list,
			task:''
		}))
	}
	handleInput(ev){
		const val = ev.target.value
		// const val = this.input.value
		this.setState((preState)=>({
			task:val
		}))
	}
	handleDel(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState((preState)=>({
			list:list
		}))
	}
	render(){
		return (
			<div className = 'App'>
			<Row>
				{
				//<input ref={(input)=>{this.input=input}} onChange={this.handleInput} value={this.state.task}/>
				//<button className="btn" onClick = {this.handleAdd}>提交</button>
				}
				<Col span={18}>
				<Input 
					onChange={this.handleInput} 
					value={this.state.task}
				/>
				</Col>
				<Col span={6}>
				<Button 
					type="primary"
					onClick = {this.handleAdd}
				>
					提交
				</Button>
				</Col>
			</Row>
				<List
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => (
			        <List.Item onClick={this.handleDel.bind(this,index)}>
			          {item}
			        </List.Item>
			      )}
			    />
				<DatePicker/>
			</div>
		)
	}
}


export default App