import React from 'react'
import lodash from 'lodash'
import PageHeader from './SiteHeader'
import DesktopIcons from './DesktopIconContainer'
import AppContainer from '../applications/layout/AppContainer'
import TerminalView from '../applications/terminal/TerminalView'
import FileExplorer from '../applications/file-viewer/FileExplorer'
import { v4 as uuidv4 } from 'uuid'
import BackGround from '../../img/statue-1594091269482-1978.jpg'
import '../../css/main.css'

export default class Desktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      terminal: this.generateTerminalApp(),
      applications: this.generateFolderApp(),
    }
  }

  generateFolderApp = () => {
    return (
      <AppContainer
        appName="applications"
        appContent={<FileExplorer />}
        footerChunks={[
          '/pihole 837215 bytes',
          '50 file(s) found (812753 bytes)',
          'scan complete',
        ]}
        closeApp={this.closeApp.bind(this)}
        key={uuidv4()}
      />
    )
  }

  generateTerminalApp = () => {
    return (
      <AppContainer
        appName="terminal"
        appContent={<TerminalView />}
        footerChunks={['administrator', 'size: 400 x 600']}
        closeApp={this.closeApp.bind(this)}
        key={uuidv4()}
      />
    )
  }

  closeApp(e) {
    const foundKey = Object.keys(this.state).filter(
      (key) => key === lodash.camelCase(e.currentTarget.id)
    )

    if (!foundKey[0]) return

    this.setState({ [foundKey]: null })
  }

  spawnNewApp(e) {
    const key = e.currentTarget.getAttribute('name')
    const id = e.currentTarget.id

    let app = null
    switch (id) {
      case '0':
        app = this.generateTerminalApp()
        break
      case '1':
        app = this.generateFolderApp()
        break
      default:
        break
    }
    this.setState({ [key]: app })
  }

  render() {
    return (
      <div className="application-container">
        <img src={BackGround} alt="bg" />
        <PageHeader />
        <main>
          <DesktopIcons
            iconClicked={this.spawnNewApp.bind(this)}
            appNames={Object.keys(this.state)}
          />
          {[...Object.keys(this.state)].map((app) => {
            return this.state[app]
          })}
        </main>
      </div>
    )
  }
}
