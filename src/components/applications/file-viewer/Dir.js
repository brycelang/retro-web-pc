import React from 'react'
import Folder from '../../../img/directory_closed-4.png'

export default class Dir extends React.Component {
  render() {
    return (
      <div className="dir">
        <a href={'/' + this.props.name}>
          <img src={Folder} alt="folder" className="icon" />
          <span className="name">{this.props.name}</span>
        </a>
      </div>
    )
  }
}
