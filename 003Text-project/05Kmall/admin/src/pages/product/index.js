import React, { Component } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import ProductList from './list.js'
import ProductAdd from './add.js'
import ProductDetail from './detail.js'

class Product extends Component{
	render(){
		return(
			<Switch>
				<Route exact path='/product' component={ProductList} />
				<Route path='/product/add/:productId?' component={ProductAdd} />
				<Route path='/product/detail/:productId?' component={ProductDetail} />
			</Switch>
		)
	}
}
export default Product