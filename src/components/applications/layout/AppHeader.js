import React from 'react'

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header">
        <span className="btn-before">{'\u2592'}</span>
        <span className="app-title">{this.props.title}</span>
        <div className="btns-after">
          <span className="btn">{'\u25BE'}</span>
          <span className="btn">{'\u25B4'}</span>
          <span
            className="btn"
            id={this.props.title}
            onClick={(e) => this.props.closeApp(e)}
          >
            {'\u2A2F'}
          </span>
        </div>
      </header>
    )
  }
}
