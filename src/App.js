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
    this.startStop = this.startStop.bind(this);
    this.setLength = this.setLength.bind(this);
  }
  componentDidUpdate() {
    if (!this.state.stopped) {
      setTimeout(() => {
        if (!this.state.stopped) {
          let length = this.state.interval + "Length";
          let status = this.state.interval + "Status";
          this.setState(function (prevState) {
            if (prevState[status] > 0) {
              return { [status]: prevState[status] - 1 };
            } else {
              document.getElementById("beep").play();
              if (prevState.interval === "session") {
                return {
                  [status]: prevState[length],
                  interval: "break"
                };
              } else {
                return {
                  [status]: prevState[length],
                  interval: "session"
                };
              }
            }
          });
        }
      }, 1000);
    }
  }
  setLength(e, name) {
    let value = e.target.value;
    let length = name + "Length";
    let status = name + "Status";
    if (value === "") {
      this.setState({
        [length]: 0,
        [status]: 0
      });
    } else {
      let intValue = parseInt(value, 10);
      if (intValue >= 1 && intValue <= 60) {
        this.setState({
          [length]: intValue * 60,
          [status]: intValue * 60
        });
      }
    }
  }
  detectScroll(e) {
    let direction = false;
    if (e.deltaY < 0) direction = "plus";
    else if (e.deltaY > 0) direction = "minus";
    return direction;
  }
  timeArray(time) {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    let minString, secString;
    if (min < 10) minString = "0" + min.toString();
    else minString = min.toString();
    if (sec < 10) secString = "0" + sec.toString();
    else secString = sec.toString();
    return [min, sec, minString, secString];
  }
  handleModification(name, sign) {
    if (this.state.stopped) {
      let length = name + "Length";
      let status = name + "Status";
      if (sign === "plus") {
        this.setState(function (prevState) {
          if (prevState[length] + 60 <= 3600)
            return {
              [length]: prevState[length] + 60,
              [status]: prevState[length] + 60
            };
          else return prevState;
        });
      } else {
        this.setState(function (prevState) {
          if (prevState[length] - 60 >= 60)
            return {
              [length]: prevState[length] - 60,
              [status]: prevState[length] - 60
            };
          else return prevState;
        });
      }
    }
  }
  handleReset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      sessionLength: 1500,
      breakLength: 300,
      sessionStatus: 1500,
      breakStatus: 300,
      interval: "session",
      stopped: true
    });
  }
  startStop() {
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
          startStop={this.startStop}
          handleReset={this.handleReset}    
          detectScroll={this.detectScroll}
          stopped={this.state.stopped}
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