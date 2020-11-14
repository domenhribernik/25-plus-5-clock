import { Component } from "react"

class Timer extends Component {
  render() {
    return (
      <div id="timer">
        <h1 id="title">25 + 5 Clock</h1>
        <div id="settings">
          <div id="break">
            <div id="break-label">Break Length</div>
            <div id="break-decrement" onClick={this.props.handleModification("break", "minus")}><i className="fa fa-minus"></i></div>
            <div id="break-length">{this.props.breakLength}</div>
            <div id="break-increment" onClick={this.props.handleModification("break", "plus")}><i className="fa fa-plus"></i></div>
          </div>
          <div id="session">
            <div id="session-label">Session Length</div>
            <div id="session-decrement" onClick={this.props.handleModification("session", "minus")}><i className="fa fa-minus"></i></div>
            <div id="session-length">{this.props.sessionLength}</div>
            <div id="session-increment" onClick={this.props.handleModification("session", "minus")}><i className="fa fa-plus"></i></div>
          </div>
        </div>
        <div id="button-time">
          <div id="time">
            <div id="timer-label">{this.props.interval}</div>
            <div id="time-left">
              {
                this.props.interval === "session" ? (
                    this.props.timeArray(this.props.sessionStatus)[2] + ":" +
                    this.props.timeArray(this.props.sessionStatus)[3]
                ) : (
                  this.props.timeArray(this.props.breakStatus)[2] + ":" +
                  this.props.timeArray(this.props.breakStatus)[3]
                )
              }
            </div>
          </div>
          <div id="buttons">
            <div id="start_stop" onClick={this.props.handleStartStop}>
              <div id="start"><i className="fa fa-play"></i></div>
              <div id="stop"><i className="fa fa-pause"></i></div>
            </div>
            <div id="reset" onClick={this.props.handleReset}><i className="fa fa-refresh"></i></div>
          </div>
        </div>
        <audio id="sound" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" preload="auto" />
      </div>
    )
  }
}

export default Timer