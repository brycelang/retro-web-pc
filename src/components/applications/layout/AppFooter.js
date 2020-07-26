import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export default class AppFooter extends React.Component {
  render() {
    return (
      <footer>
        {this.props.chunks.map((chunk) => {
          return (
            <span className="chunk" key={uuidv4()}>
              {chunk}
            </span>
          )
        })}
      </footer>
    )
  }
}
