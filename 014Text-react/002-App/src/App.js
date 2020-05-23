import React,{Component,Fragment} from 'react'
import './App.css'
import Item from './Item.js'
import { Calendar } from 'antd';


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
		// const val = ev.target.value
		const val = this.input.value
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
	getItem(){
		return this.state.list.map((item,index)=>{
			return(
				<Item 
					key={index} 
					task={item}
					list={this.state.list}
					index={index}
					handleDel={this.handleDel.bind(this,index)}
				/>
			)
		})
	}
	render(){
		return (
			<div className = 'App'>
				<input ref={(input)=>{this.input=input}} onChange={this.handleInput} value={this.state.task}/>
				<button className="btn" onClick = {this.handleAdd}>提交</button>
				<ul className='list' ref={(ul)=>{this.ul=ul}}>
					{
						this.getItem()
					}
				</ul>
			</div>
		)
	}
}


export default App