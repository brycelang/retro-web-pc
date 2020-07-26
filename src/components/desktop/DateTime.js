import React, { Component } from 'react'

export default class DateTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString('en-US', this.format),
    }
    this.format = {
      hour: '2-digit',
      minute: '2-digit',
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick()
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString('en-US', this.format),
    })
  }

  render() {
    return (
      <div className="date-time">
        <span className="date">{this.state.date}</span>
        <span className="time">{this.state.time}</span>
      </div>
    )
  }
}
