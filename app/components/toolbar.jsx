import React from 'react'

export default class Toolbar extends React.Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: '#000'
				}}
				>
				<ul>
					<li><i className="icon fa fa-eraser"/></li>
					<li><i className="fa fa-save"/></li>
					<li><i className="fa fa-square-o"/></li>
				</ul>
			</div>
		)
	}
}
