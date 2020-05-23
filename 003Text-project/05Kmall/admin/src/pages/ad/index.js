import React, { Component } from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import AdList from './list.js'
import AdAdd from './add.js'

class Ad extends Component{
	render(){
		return(
			<Switch>
				<Route path='/ad/add/:adId?' component={AdAdd} />
				<Route path='/ad' component={AdList} />
			</Switch>
		)
	}
}
export default Ad