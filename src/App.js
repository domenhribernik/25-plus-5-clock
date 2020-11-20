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
      sessionOrBreak: "session",
      stopped: true
    };
    this.handleModification = this.handleModification.bind(this);
    this.reset = this.reset.bind(this);
    this.pauseplay = this.pauseplay.bind(this);
    this.setLength = this.setLength.bind(this);
  }
  componentDidUpdate() {
    if (!this.state.stopped) {
      setTimeout(() => {
        if (!this.state.stopped) {
          let nameLength = this.state.sessionOrBreak + "Length";
          let nameStatus = this.state.sessionOrBreak + "Status";
          this.setState(function (prevState) {
            if (prevState[nameStatus] > 0) {
              return { [nameStatus]: prevState[nameStatus] - 1 };
            } else {
              document.getElementById("beep").play();
              if (prevState.sessionOrBreak === "session") {
                return {
                  [nameStatus]: prevState[nameLength],
                  sessionOrBreak: "break"
                };
              } else {
                return {
                  [nameStatus]: prevState[nameLength],
                  sessionOrBreak: "session"
                };
              }
            }
          });
        }
      }, 1000);
    }
  }
  setLength(event, name) {
    let value = event.target.value;
    let nameLength = name + "Length";
    let nameStatus = name + "Status";
    if (value === "") {
      this.setState({
        [nameLength]: 0,
        [nameStatus]: 0
      });
    } else {
      let intValue = parseInt(value, 10);
      if (intValue >= 1 && intValue <= 60) {
        this.setState({
          [nameLength]: intValue * 60,
          [nameStatus]: intValue * 60
        });
      }
    }
  }
  detectScrollDir(event) {
    let direction = false;
    if (event.deltaY < 0) direction = "plus";
    else if (event.deltaY > 0) direction = "minus";
    return direction;
  }
  timeArray(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    let minutesString, secondsString;
    if (minutes < 10) minutesString = "0" + minutes.toString();
    else minutesString = minutes.toString();
    if (seconds < 10) secondsString = "0" + seconds.toString();
    else secondsString = seconds.toString();
    return [minutes, seconds, minutesString, secondsString];
  }
  handleModification(name, sign) {
    if (this.state.stopped) {
      let nameLength = name + "Length";
      let nameStatus = name + "Status";
      if (sign === "plus") {
        this.setState(function (prevState) {
          if (prevState[nameLength] + 60 <= 3600)
            return {
              [nameLength]: prevState[nameLength] + 60,
              [nameStatus]: prevState[nameLength] + 60
            };
          else return prevState;
        });
      } else {
        this.setState(function (prevState) {
          if (prevState[nameLength] - 60 >= 60)
            return {
              [nameLength]: prevState[nameLength] - 60,
              [nameStatus]: prevState[nameLength] - 60
            };
          else return prevState;
        });
      }
    }
  }
  reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      sessionOrBreak: "session",
      stopped: true
    });
  }
  pauseplay() {
    this.setState((prevState) => ({
      stopped: !prevState.stopped
    }));
  }

  render() {
    return (
      <div className="container">
        <Timer 
          setLength={this.setLength}
          timeArray={this.timeArray}
          handleModification={this.handleModification}    
          pauseplay={this.pauseplay}
          reset={this.reset}    
          detectScrollDir={this.detectScrollDir}
          stopped={this.stopped}
          // startStyle={this.state.startStyle}
          // stopStyle={this.state.stopStyle}
          sessionLength={this.state.sessionLength}
          sessionStatus={this.state.sessionStatus} 
          breakLength={this.state.breakLength}
          breakStatus={this.state.breakStatus} 
          sessionOrBreak={this.state.sessionOrBreak} 
        />
      </div>
    )
  }
}

export default App