import React from "react"
import Toolbar from "./widgets/Toolbar.jsx"
import Sidebar from "./widgets/Sidebar.jsx"
import Canvas from "./widgets/Canvas.jsx"

export default class Application extends React.Component {
  render() {
    return (
      <Toolbar />
      <Sidebar />
      <Canvas />
    )
  }
}
