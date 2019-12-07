import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

/*
function tisk(){
	const timer = (
			<div>
				<h1>欢迎</h1>
				<p>{new Date().toLocaleString()}</p>
			</div>
		)
	ReactDOM.render(
		timer,
		document.getElementById('root')
	)
}
setInterval(tisk,1000)
*/