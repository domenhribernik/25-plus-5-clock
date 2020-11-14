import { Component } from "react";
import Timer from "./Timer"
import "./css/app.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      interval: "session",
      stopped: true
    };
    this.handleModification = this.handleModification.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.setLength = this.setLength.bind(this);
  }
  componentDidUpdate() {
    if (!this.state.stopped) {
      setTimeout(() => {
        let length = this.state.interval + "Length"
        let status = this.state.interval + "Status"
        this.setState(function(prevState){
          if (prevState[status] > 0) {
            return {[status]: prevState[status] - 1}
          } else {
            document.getElementById("sound").play()
            if (prevState.interval === "session") {
              return {
                [status]: prevState[length],
                interval: "break"
              }
            } else {
              return {
                [status]: prevState[length],
                interval: "session"
              }
            }
          }
        })
      }, 1000);
    }
  }

  setLength(e, interval) {
    let value = e.target.value
    let length = interval + "Length"
    let status = interval + "Status"
    if (value === "") {
      this.setState({
        [length]: 0,
        [status]: 0
      })
    } else {
      value = parseInt(value, 10)
      if (value >= 1 && value <= 60) {
        this.setState({
          [length]: value * 60,
          [status]: value * 60
        })
      }
    }
  }

  timeArray(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    let minutesString, secondsString
    minutes < 10 ? minutesString = "0" + minutes.toString() : minutesString = minutes.toString()
    seconds < 10 ? secondsString = "0" + seconds.toString() : secondsString = seconds.toString()
    return [minutes, seconds, minutesString, secondsString]
  }

  handleModification(interval, operator) {
    if (this.state.stopped) {
      let length = interval + "Length"
      let status = interval + "Status"
      if (operator = "plus") {
        this.setState(function(prevState) {
          if (prevState[length] + 60 <= 3600) {
            return {
              [lenght]: prevState[length] + 60,
              [status]: prevState[length] + 60 
            }
          } else {
            return prevState
          }
        })
      } else {
        this.setState(function(prevState) {
          if (prevState[length] - 60 <= 60) {
            return {
              [lenght]: prevState[length] - 60,
              [status]: prevState[length] - 60 
            }
          } else {
            return prevState
          }
        })
      }
    }
  }

  handleReset() {
    document.getElementById("sound").pause()
    document.getElementById("sound").currentTime = 0
    this.setState({
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      interval: "session",
      stopped: true
    })
  }

  handleStartStop() {
    this.setState((prevState) => ({
      stopped: !prevState.stopped
    }))
  }

  render() {
    return (
      <div className="container">
        <Timer 
          setLength={this.setLength}
          timeArray={this.timeArray}
          handleModification={this.handleModification}    
          handleReset={this.handleReset}    
          handleStartStop={this.handleStartStop}
          // startStyle={this.state.startStyle}
          // stopStyle={this.state.stopStyle}
          sessionLength={this.state.sessionLength}
          sessionStatus={this.state.sessionStatus} 
          breakLength={this.state.breakLength}
          breakStatus={this.state.breakStatus} 
          interval={this.state.interval} 
        />
      </div>
    )
  }
}

export default App