import { Component } from "react"

class Timer extends Component {
  render() {
    return (
      <div id="timer">
        <div id="settings">
          <div id="break">
            <div id="break-label">Break Length</div>
            <div id="break-increment" onClick={this.props.handleIncrement}><i className="fa fa-arrow-up"></i></div>
            <div id="break-decrement" onClick={this.props.handleDecrement}><i className="fa fa-arrow-down"></i></div>
            <div id="break-length">{this.props.breakLength}</div>
          </div>
          <div id="session">
            <div id="session-label">Session Length</div>
            <div id="session-increment" onClick={this.props.handleIncrement}><i className="fa fa-arrow-up"></i></div>
            <div id="session-decrement" onClick={this.props.handleDecrement}><i className="fa fa-arrow-down"></i></div>
            <div id="session-length">{this.props.sessionLength}</div>
          </div>
        </div>
        <div id="time">
          <div id="timer-label">Session</div>
          <div id="time-left">{`${this.props.minutes}:${this.props.seconds}`}</div>
        </div>
        <div id="buttons">
          <div id="start_stop">
          <div id="start" onClick={this.props.handleStart}><i className="fa fa-play"></i></div>
          <div id="stop" onClick={this.props.handleStop}><i className="fa fa-pause"></i></div>
          </div>
          <div id="reset" onClick={this.props.handleReset}><i className="fa fa-refresh"></i></div>
        </div>
      </div>
    )
  }
}

export default Timer