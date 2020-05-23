import React,{Component,Fragment} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// this.props.match.pamas.id
class Admin extends Component{
	render(
		return(
			
		)
	)
}
export default {
	rebder(){
		return(
			<Router>
				<div>
					<ul>
						<li><link to='/'>HOME</link></li>
						<li><link to='/todulist'>Todolist</link></li>
						<li><link to='/about'>about</link></li>
					</ul>
					<Route exact path='/' />HOME
					<Route  path='/todulist' />Todolist
					<Route  path='/about' />About
				</div>
			</Router>
		)
	}
}