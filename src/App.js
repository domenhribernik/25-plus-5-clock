import { Component } from "react";
import Timer from "./Timer"
import "./css/app.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      display: "25:00",
      time: 1500,
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
          time: prevState.time + 60,
          display: this.clockify(prevState.time + 60)
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
          time: prevState.time + 60,
          display: this.clockify(prevState.time + 60)
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
          time: prevState.time - 60,
          display: this.clockify(prevState.time - 60)
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
          time: prevState.time - 60,
          display: this.clockify(prevState.time - 60)
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
      display: "25:00",
      time: 1500,
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
    this.setState(prevState => ({
      time: prevState.time - 1,
    }))
    if (this.state.time < 0) {
      this.alarm(this.state.time)
      if (this.state.currentInterval === "Session") {
        this.switchTimer(this.state.breakLength * 60, "Break")        
      } else if (this.state.currentInterval === "Break") {
        this.switchTimer(this.state.sessionLength * 60, "Session")
      }
    }
    this.setState({
      display: this.clockify(this.state.time)
    }) 
  }

  alarm(timer) {
    if (timer < 0) {
      var sound = document.getElementById("beep")
      sound.currentTime = 0
      sound.play()
    }
  }
  switchTimer(num, str) {
    this.setState({
      time: num,
      currentInterval: str
    });
  }
  clockify(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div className="container">
        <Timer 
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          display={this.state.display}
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