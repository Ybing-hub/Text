/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-06 15:23:43
*/
import React,{Component} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from 'pages/login'

class App extends Component{
	render(){
		const ProtectRoute = ({component:Component,...rest})=>{
			return <Route 
				{...rest}
				render={(props)=>{
					return this.state.isAdmin ? <Component {...props} /> : <h2>this is login page</h2>
				}}
			/>
		}
		return(
			<Router>
				<div className='App'>
					<Route path='/login' component={Login} />
				</div>
			</Router>
		)
	}
}



export default App