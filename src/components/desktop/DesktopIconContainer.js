import React from 'react'
import Icon from './DesktopIcon'
import FolderIcon from '../../img/directory_closed-4.png'
import TerminalIcon from '../../img/console_prompt-0.png'

export default class DesktopIcons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icons: [TerminalIcon, FolderIcon],
    }
  }
  render() {
    return (
      <div className="desktop-icons">
        {this.state.icons.map((icon, i) => {
          return (
            <Icon
              icon={icon}
              appName={this.props.appNames[i]}
              id={i}
              iconClicked={this.props.iconClicked}
            />
          )
        })}
      </div>
    )
  }
}
