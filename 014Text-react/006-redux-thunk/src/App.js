import React,{Component} from 'react'
import Item from './Item.js'
import { Input,Button,Row,Col,List } from 'antd';
import store from './store/index.js'
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction,
	getLoadDataAction
} from './store/actionCreator.js'
import APPUI from './APPUI.js'
import axios from 'axios'
class App extends Component{
	constructor(props){
		super(props)

		/*
		this.state = {
			list:['吃饭','烤串','扎啤'],
			task:''
		}
		*/
		console.log(store)
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)

		this.state=store.getState()
		store.subscribe(()=>{
			this.setState(store.getState())
		})
	}
	componentDidMount(){
		/*
		axios.get('http://127.0.0.1:3000')
		.then(result=>{
			// console.log(result.data)
			store.dispatch(getLoadDataAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
		*/
		store.dispatch(getLoadDataAction())
	}
	handleAdd(){
		const list = [...this.state.list,this.state.task]
		/*
		this.setState((preState)=>({
			list:list,
			task:''
		}))
		
		const action = {
			type:ADD_ITEM
		}
		*/
		store.dispatch(getAddItemAction())
	}
	handleInput(ev){
		const val = ev.target.value
		// const val = this.input.value
		/*this.setState((preState)=>({
			task:val
		}))
		const action = {
			type:CHANGE_ITEM,
			payload:val
		}
		*/
		store.dispatch(getChangeItemAction(val))
	}
	handleDel(index){
		const list = [...this.state.list]
		/*
		list.splice(index,1)
		this.setState((preState)=>({
			list:list
		}))
	
		const action = {
			type:DEL_ITEM,
			payload:index
		}
		*/
		store.dispatch(getDelItemAction(index))
	}
	render(){
		return (
			<APPUI
				task = {this.state.task}
				list = {this.state.list}
				handleAdd = {this.handleAdd}
				handleInput = {this.handleInput}
				handleDel = {this.handleDel}
			/>
		)
	}
}


export default App