import React,{Component,Fragment} from 'react'
import './App.css'
import Item from './Item.js'
import { Calendar } from 'antd';
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction,
	getLoadDataAction
} from './getaction.js'

class App extends Component{
	constructor(props){
		super(props)
		//初始化state
		this.state = {
			list:['吃饭','睡觉'],
			task:''
		}

		this.handleInput = this.handleInput.bind(this)
		this.handelAdd = this.handelAdd.bind(this)
	}
	handelAdd(){
		const list = [...this.state.list,this.state.task]
		const action = {
			
		}
		store.dispatch(getAddItemAction())
	}
	handleInput(ev){
		const val = this.input.value
		const action = {

		}
		store.dispatch(getChangeItemAction())
	}
	handleDel(index){
		const list = [...this.state.list]
		const action = {
			
		}
		store.dispatch(getDelItemAction(index))
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return (
				<Item 
					key={index} 
					task={item} 
					list={this.state.list} 
					index={index} 
					handleDel = {this.handleDel.bind(this,index)}
				/>
			)
		})
	}
	render(){
		return (
			<div className='App'>
				<input ref={(input)=>{this.input = input}} onChange={this.handleInput} value={this.state.task} />
				<button className='btn' onClick={this.handelAdd.bind(this)}>提交</button>
				<ul className='list' ref={(ul)=>{this.ul = ul}}>
					{	
						this.getItems()
					}
				</ul>
			</div>	
		)
	}
}


export default App