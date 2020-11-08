import { Component } from "react";
import Timer from "./Timer"
import "./css/app.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: "25",
      seconds: "00",
      interval: 0,
      currentInterval: "Session",
      startStyle: {display: "inline-block"},
      stopStyle: {display: "none"}
    }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
    this.timer = this.timer.bind(this)
  }
  handleIncrement(e) {
    e.preventDefault()
    if (e.target.parentElement.id.includes("break") && this.state.breakLength < 60) {
      if (this.state.currentInterval === "Break") {
        this.setState(prevState => ({
          breakLength: prevState.breakLength + 1,
          minutes: parseInt(prevState.breakLength) + 1 < 10 ? "0" + (parseInt(prevState.breakLength) + 1).toString() : (parseInt(prevState.breakLength) + 1).toString()
        }))
      } else {
        this.setState(prevState => ({
          breakLength: prevState.breakLength + 1
        }))
      }
    } else if (e.target.parentElement.id.includes("session") && this.state.sessionLength < 60) {
      if (this.state.currentInterval === "Session") {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength + 1,
          minutes: parseInt(prevState.sessionLength) + 1 < 10 ? "0" + (parseInt(prevState.sessionLength) + 1).toString() : (parseInt(prevState.sessionLength) + 1).toString()
        })) 
      } else {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength + 1,
        })) 
      }
    }
  }
  handleDecrement(e) {
    e.preventDefault()
    if (e.target.parentElement.id.includes("break") && this.state.breakLength > 1) {
      if (this.state.currentInterval === "Break") {
        this.setState(prevState => ({
          breakLength: prevState.breakLength - 1,
          minutes: prevState.breakLength - 1 < 10 ? "0" + (prevState.breakLength - 1) : prevState.breakLength - 1
        })) 
      } else {
        this.setState(prevState => ({
          breakLength: prevState.breakLength - 1
        }))
      }
    } else if (e.target.parentElement.id.includes("session") && this.state.sessionLength > 1) {
      if (this.state.currentInterval === "Session") {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength - 1,
          minutes: prevState.sessionLength - 1 < 10 ? "0" + (prevState.sessionLength - 1) : prevState.sessionLength - 1
        })) 
      } else {
        this.setState(prevState => ({
          sessionLength: prevState.sessionLength - 1,
        })) 
      }
    }
  }

  handleReset(e) {
    e.preventDefault()
    clearInterval(this.state.interval)
    var sound = document.getElementById("beep")
    sound.pause()
    sound.currentTime = 0
    this.setState({
      currentInterval: "Session",
      breakLength: 5,
      sessionLength: 25,
      minutes: "25",
      seconds: "00",
      startStyle: {display: "inline-block"},
      stopStyle: {display: "none"}
    })
  }

  clearInterval() {
    clearInterval(this.state.interval)
    this.setState({
      interval: 0,
      startStyle: {display: "inline-block"},
      stopStyle: {display: "none"}
    })
  }

  handleStartStop() {
    if (this.state.interval === 0) {
      this.setState({
        interval: setInterval(this.timer, 1000),
        stopStyle: {display: "inline-block"},
        startStyle: {display: "none"}
      })
    } else {
      this.clearInterval()
    }
  }

  timer() {
    if (this.state.seconds === "00" && this.state.minutes === "00") {
      var sound = document.getElementById("beep")
      sound.currentTime = 0
      sound.play()
      if (this.state.currentInterval === "Session") {
        this.setState(prevState => ({
          minutes: prevState.breakLength,
          currentInterval: "Break"
        }))
        
      } else if (this.state.currentInterval === "Break") {
        this.setState(prevState => ({
          minutes: prevState.sessionLength,
          currentInterval: "Session"
        }))
      }
    } else if (this.state.seconds === "00" && this.state.minutes > 0) {
      this.setState(prevState => ({
        seconds: "59",
        minutes: prevState.minutes <= 10 ? "0" + (prevState.minutes - 1) : prevState.minutes - 1
      }))
    } else if (this.state.seconds > 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds <= 10 ? "0" + (prevState.seconds - 1) : prevState.seconds - 1,
        minutes: prevState.minutes.toString().length === 1 ? "0" + prevState.minutes : prevState.minutes
      }))
    }
  }

  render() {
    return (
      <div className="container">
        <Timer 
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          minutes={this.state.minutes}
          seconds={this.state.seconds}   
          currentInterval={this.state.currentInterval}     
          startStyle={this.state.startStyle}
          stopStyle={this.state.stopStyle}
          handleIncrement={this.handleIncrement}    
          handleDecrement={this.handleDecrement}        
          handleReset={this.handleReset}    
          handleStartStop={this.handleStartStop}
        />
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" preload="auto" />
      </div>
    )
  }
}

export default App