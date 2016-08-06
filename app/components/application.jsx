import React from 'react'

import Toolbar from './toolbar'
import Canvas from './canvas'

export default class Application extends React.Component {
	render() {
		return (
			<div>
				<Toolbar/>
				<Canvas/>
			</div>
		)
	}
}
