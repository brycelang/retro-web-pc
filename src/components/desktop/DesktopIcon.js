import React from 'react'
import lodash from 'lodash'

export default class Icon extends React.Component {
  render() {
    return (
      <div
        className="desktop-icon"
        name={this.props.appName}
        id={this.props.id}
        onClick={(e) => {
          this.props.iconClicked(e)
        }}
      >
        <img src={this.props.icon} alt="icon" />
        <span className="icon-label">
          {lodash.startCase(this.props.appName)}
        </span>
      </div>
    )
  }
}
