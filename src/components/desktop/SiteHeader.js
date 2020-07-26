import React from 'react'
import DateTime from './DateTime'

export default class PageHeader extends React.Component {
  render() {
    return (
      <header>
        <span className="logo">W</span>
        <span className="option">File</span>
        <span className="option">Edit</span>
        <span className="option">View</span>
        <span className="option">Help</span>
        <DateTime />
      </header>
    )
  }
}
