import React from 'react'

export default class Toolbar extends React.Component {
  render() {
    return (
      <header id="header">
        <nav className="menu menu-global">
          <ul>
            <li className="js-menu-btn">Pen</li>
            <li className="global-icon global-icon-close" />
            <li className="global-icon global-icon-minimize" />
            <li className="global-icon global-icon-maximize" />
          </ul>
        </nav>
        <nav className="menu menu-theme">
          <ul className="js-theme" />
        </nav>
        <nav className="menu menu-tool">
          <ul>
            <li className="js-paint-tool-btn">
              <i className="icon fa fa-eraser" />
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
