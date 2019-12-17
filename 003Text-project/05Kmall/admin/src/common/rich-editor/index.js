import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'

class RichSimditor extends Component{
	constructor(props){
		super(props)
		this.state = {
			toolbar:[
				'title',
			    'bold',
			    'italic',
			    'underline',
			    'strikethrough',
			    'fontScale',
			    'color',
			    'ol',
			    'ul',
			    'blockquote',
			    'code',
			    'table',
			    'link',
			    'image',
			    'hr',
			    'indent',
			    'outdent',
			    'alignment'
		    ]
		}
	}
	componentDidMount(){
		const editor = new Simditor({
		  	textarea: this.textarea,
		  	toolbar:this.state.toolbar
		})
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea=textarea}} id="editor" ></textarea>
		)
	}
}
export default RichSimditor