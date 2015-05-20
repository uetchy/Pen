import React from 'react'

export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sideBar">
        <ul>
          <li><span className="js-save-btn" title="Save Image"><i className="fa fa-save"></i></span></li>
          <li><span className="js-clear-all-btn" title="Clear All"><i className="fa fa-square-o"></i></span></li>
        </ul>
      </div>
    )
  }
}
