import React from 'react'
import ScrollToBotton from 'react-scroll-to-bottom'
import fetch from 'node-fetch'

require('dotenv').config()

export default class TerminalView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      warning: null,
    }
  }

  async componentDidMount() {
    await this.processLines(this.getLogo())
    await this.processLines(await this.getHWInfo())
    await this.processLines(await this.getPiHoleInfo())

    // const msgSplit = msg.split('\n')
  }

  async processLines(lines) {
    if (lines.length === 1) {
      this.updateMsg(lines[0].trim())
    }
    for (let line of lines) {
      await this.updateMsg(line.trim())
    }
  }

  async updateMsg(line) {
    for (let i = 0; i < line.length; i++) {
      this.setState({ msg: this.state.msg + line.charAt(i) })
      await this.sleep(2)
    }
    this.setState({ msg: this.state.msg + '\n' })
  }

  async callAPI(domainName, port, route) {
    try {
      let req = await fetch(
        `http://${domainName}:${port}/${route}?appid=${process.env.REACT_APP_API_KEY}`
      )
      return await req.json()
    } catch (error) {
      return { error }
    }
  }

  getLogo() {
    return [
      ' ________  ___   __   __  _______  ___      _______ ',
      '|       ||   | |  | |  ||       ||   |    |    ___|',
      '|    _  ||   | |  |_|  ||       ||   |    |   |___',
      '|   |_| ||   | |       ||  |¯|  ||   |    |    ___|',
      '|    ___||   | |       ||  |_|  ||   |___ |   |___',
      '|   |    |   | |  |¯|  ||       ||       ||       |',
      '|___|    |___| |__| |__||_______||_______||_______|',
    ]
  }

  async getHWInfo() {
    let res = await this.callAPI(
      process.env.REACT_APP_API_URL2,
      '8081',
      'hwinfo'
    )
    if (res.error) {
      res = await this.callAPI(
        process.env.REACT_APP_API_URL1,
        '8080',
        'hwinfo'
      )
    }
    if (res.msg) return [res.msg]
    return [
      '============== HW INFO ==============',
      'OS: ' + res.os,
      'CPU: ' + res.cpu,
      'RAM: ' + res.mem,
    ]
  }

  async getPiHoleInfo() {
    let res = await this.callAPI(
      process.env.REACT_APP_API_URL2,
      '8081',
      'pihole'
    )
    if (res.error) {
      res = await this.callAPI(
        process.env.REACT_APP_API_URL1,
        '8080',
        'pihole'
      )
    }
    if (res.msg) return [res.msg]

    const result = [
      '========== PIHOLE VERSION ===========',
      'Current: ' + res.current,
      'Latest: ' + res.latest,
    ]

    if (res.current !== res.latest) {
      result.push(
        '[WARNING] version mismatch found!\nUpdate your system!'
      )
      this.setState({ warning: 'warning' })
    }

    return result
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  render() {
    return (
      <ScrollToBotton className="feed">
        <pre className={this.state.warning}>{this.state.msg}</pre>
      </ScrollToBotton>
    )
  }
}
