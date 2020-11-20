import { Component } from "react"

class Timer extends Component {
  render() {
    return (
      <div id="timer">
        <h1 id="title">25 + 5 Clock</h1>
        <div id="settings">
          <div id="break" onWheel={(e) => this.props.handleModification("break", this.props.detectScroll(e))}
          >
            <div id="break-label">Break Length</div>
            <div id="break-decrement" onClick={() => this.props.handleModification("break", "minus")}><i className="fa fa-arrow-down"></i></div>
            <div id="break-length" onChange={(e) => this.props.setLength(e, "break")}>{this.props.timeArray(this.props.breakLength)[0]}</div>
            <div id="break-increment" onClick={() => this.props.handleModification("break", "plus")}><i className="fa fa-arrow-up"></i></div>
          </div>
          <div id="session" onWheel={(e) => this.props.handleModification("session", this.props.detectScroll(e))}
          >
            <div id="session-label">Session Length</div>
            <div id="session-decrement" onClick={() => this.props.handleModification("session", "minus")}><i className="fa fa-arrow-down"></i></div>
            <div id="session-length" onChange={(e) => this.props.setLength(e, "session")}>{this.props.timeArray(this.props.sessionLength)[0]}</div>
            <div id="session-increment" onClick={() => this.props.handleModification("session", "plus")}><i className="fa fa-arrow-up"></i></div>
          </div>
        </div>

        {/* timer */}
        <div id="button-time">
          <div id="time">
            <div id="timer-label">{this.props.interval.charAt(0).toUpperCase() + this.props.interval.slice(1)}</div>
            <div id="time-left">
              {this.props.interval === "session" ? (
                <div>
                  {this.props.timeArray(this.props.sessionStatus)[2]}:
                  {this.props.timeArray(this.props.sessionStatus)[3]}
                </div>
              ) : (
                <div>
                  {this.props.timeArray(this.props.breakStatus)[2]}:
                  {this.props.timeArray(this.props.breakStatus)[3]}
                </div>
              )}
            </div>
          </div>
          <div id="buttons">
            <div id="start_stop" onClick={() => this.props.startStop()}>
              {this.props.stopped === true ? (
                <div id="start"><i className="fa fa-play"></i></div>
              ) : (
                <div id="stop"><i className="fa fa-pause"></i></div>
              )}
            </div>
            <div id="reset" onClick={() => this.props.handleReset()}>
              <i className="fa fa-undo"></i>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    )
  }
}

export default Timer