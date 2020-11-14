import { Component } from "react"

class Timer extends Component {
  render() {
    return (
      <div id="timer">
        <h1 id="title">25 + 5 Clock</h1>
        <div id="settings">
          <div id="break">
            <div id="break-label">Break Length</div>
            <div id="break-decrement" onClick={this.props.handleDecrement}><i className="fa fa-minus"></i></div>
            <div id="break-length">{this.props.breakLength}</div>
            <div id="break-increment" onClick={this.props.handleIncrement}><i className="fa fa-plus"></i></div>
          </div>
          <div id="session">
            <div id="session-label">Session Length</div>
            <div id="session-decrement" onClick={this.props.handleDecrement}><i className="fa fa-minus"></i></div>
            <div id="session-length">{this.props.sessionLength}</div>
            <div id="session-increment" onClick={this.props.handleIncrement}><i className="fa fa-plus"></i></div>
          </div>
        </div>
        <div id="button-time">
          <div id="time">
            <div id="timer-label">{this.props.currentInterval}</div>
            <div id="time-left">{this.props.display}</div>
          </div>
          <div id="buttons">
            <div id="start_stop" onClick={this.props.handleStartStop}>
              <div id="start" style={this.props.startStyle}><i className="fa fa-play"></i></div>
              <div id="stop" style={this.props.stopStyle}><i className="fa fa-pause"></i></div>
            </div>
            <div id="reset" onClick={this.props.handleReset}><i className="fa fa-refresh"></i></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Timer