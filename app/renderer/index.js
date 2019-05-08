import React from 'react'
import ReactDOM from 'react-dom'
import { Flux } from 'fluxxor'
import Router, { Route, DefaultRoute, NotFoundRoute } from 'react-router'
import App from './components/App'

ReactDOM.render(<App />, document.querySelector('app'))
