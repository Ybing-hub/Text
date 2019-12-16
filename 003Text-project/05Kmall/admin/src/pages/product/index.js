import React, { Component } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import ProductList from './list.js'
import ProductAdd from './add.js'

class Category extends Component{
	render(){
		return(
			<Switch>
				<Route exact path='/product' component={ProductList} />
				<Route path='/product/add' component={ProductAdd} />
			</Switch>
		)
	}
}
export default Category