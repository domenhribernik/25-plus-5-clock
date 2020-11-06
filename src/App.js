import { Component } from "react";
import Timer from "./Timer"
import "./css/app.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: "00",
      interval: ""
    }
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.timer = this.timer.bind(this)
  }
  handleIncrement(e) {
    e.preventDefault()
    // document.getElementById("reset").parentElement
    if (e.target.parentElement.id.includes("break") && this.state.breakLength < 60) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength + 1
      }))
    } else if (e.target.parentElement.id.includes("session") && this.state.sessionLength < 60) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength + 1,
        minutes: prevState.sessionLength + 1
      })) 
    }
    if (this.state.minutes >= 9) {
      console.log(this.state.minutes);
      this.setState(prevState => ({
        minutes: prevState.minutes
      }))
    } else if (this.state.minutes <= 10) {
      console.log(this.state.minutes);
      this.setState(prevState => ({
        minutes: "0" + prevState.minutes
      }))
    }
  }
  handleDecrement(e) {
    e.preventDefault()
    if (e.target.parentElement.id.includes("break") && this.state.breakLength > 1) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength - 1
      }))
    } else if (e.target.parentElement.id.includes("session") && this.state.sessionLength > 1 && this.state) {
      this.setState(prevState => ({
        sessionLength: prevState.sessionLength - 1,
        minutes: prevState.sessionLength - 1
      })) 
    }
    if (this.state.minutes <= 10) {
      console.log(this.state.minutes);
      this.setState(prevState => ({
        minutes: "0" + prevState.minutes
      }))
    }
  }
  handleReset(e) {
    e.preventDefault()
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: "00"
    })
  }

  handleStart() {
    this.setState({
      interval: setInterval(this.timer, 100)
    })
  }

  timer() {
    if (this.state.seconds === "00" && this.state.minutes > 0) {
      this.setState(prevState => ({
        seconds: 59,
        minutes: prevState.minutes - 1
      }))
      
    } else if (this.state.seconds > 0) {
      this.setState(prevState => ({
        seconds: prevState.seconds-1,
        minutes: prevState.minutes+1-1
      }))
      
    }
    if (this.state.seconds < 10) {
      console.log(this.state.seconds);
      this.setState(prevState => ({
        seconds: "0" + prevState.seconds
      }))
    }
    if (this.state.minutes <= 10) {
      console.log(this.state.minutes);
      this.setState(prevState => ({
        minutes: "0" + prevState.minutes
      }))
    }
  }

  handleStop() {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <div className="container">
        <Timer 
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          minutes={this.state.minutes}
          seconds={this.state.seconds}        
          handleIncrement={this.handleIncrement}    
          handleDecrement={this.handleDecrement}        
          handleReset={this.handleReset}    
          handleStart={this.handleStart}
          handleStop={this.handleStop}
        />
      </div>
    )
  }
}

export default App;
