import React from 'react'
import Dir from './Dir'
import fetch from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'

require('dotenv').config()

export default class FileExplorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dirs: [],
    }
  }

  componentDidMount() {
    this.setDirs()
  }

  async getDirs(domainName, port, route) {
    try {
      const req = await fetch(
        `http://${domainName}:${port}/${route}?appid=${process.env.REACT_APP_API_KEY}`
      )
      return await req.json()
    } catch (error) {
      return { error }
    }
  }

  async setDirs() {
    let res = await this.getDirs(
      process.env.REACT_APP_API_URL2,
      '8081',
      'apps'
    )
    if (res.error) {
      res = await this.getDirs(
        process.env.REACT_APP_API_URL1,
        '8080',
        'apps'
      )
    }
    if (res.msg) {
      this.setState({ dirs: [<Dir name={res.msg} key={uuidv4()} />] })
      return
    }
    var dirs = []
    for (let dir of res.dirs) {
      dirs.push(<Dir name={dir} key={uuidv4()} />)
    }
    this.setState({ dirs })
  }

  render() {
    return (
      <div className="file-explorer">
        <div className="file-tree">
          <span className="root">/pihole</span>
          <div className="dirs">
            {this.state.dirs.map((dir) => {
              return dir
            })}
          </div>
        </div>
        <div className="folder-view">
          <div className="dirs">{this.state.dirs}</div>
        </div>
      </div>
    )
  }
}
