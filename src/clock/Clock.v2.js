import './Clock.css';
import React from 'react'

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      breakLength: Clock.defaultBreakLength,
      sessionLength: Clock.defaultSessionLength,
      mode: Clock.defaultMode,
      running: false
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBreakTime = this.handleBreakTime.bind(this);
    this.handleSessionTime = this.handleSessionTime.bind(this);
  }

  static defaultMode="session";   // "session" or "break"
  static defaultSessionLength = 25;  // mins
  static defaultBreakLength=5;       // mins

  startTime = Date.parse(Date());
  myInterval = null;  // my running period handler
  iniTimeLeft = Clock.defaultSessionLength*60*1000;
  timeLeft = this.iniTimeLeft; // default time left per ms

  handleSessionTime(event){ 
    if (!this.state.running){
      let increment = 0;
      if (event.target.id === "session-increment") increment = 1;
      else if (event.target.id === "session-decrement") increment = -1;
      
      this.setState((prev) => {
        if (prev.sessionLength+increment>0 && prev.sessionLength+increment<=60) {
          if (prev.mode==="session"){
            this.iniTimeLeft = (prev.sessionLength+increment)*60*1000;
            this.timeLeft = this.iniTimeLeft;
          }
          return (
            {sessionLength: prev.sessionLength+increment}
          )
        } else return prev;   
      })
    }
  }

  handleBreakTime(event){
    if (!this.state.running){
      let increment = 0
      if (event.target.id === "break-increment") increment = 1;
      else if (event.target.id === "break-decrement") increment = -1;
      
      this.setState((prev) => {
        if (prev.breakLength+increment>0 && prev.breakLength+increment <=60) {
          if (prev.mode==="break"){
            this.iniTimeLeft = (prev.breakLength+increment)*60*1000;
            this.timeLeft = this.iniTimeLeft;
          }
          return {breakLength: prev.breakLength+increment};
        } else return prev;
      })
    }
  }

  handleStart(event){   //Start or Pause
    if (this.state.running) {
      console.log("Pause");
    } else {
      console.log("Start");
      this.iniTimeLeft = this.timeLeft
      this.startTime = Date.parse(Date());  
    }
    this.setState({running:!this.state.running});
  }

  handleReset(event){
    console.log("Reset");
    this.setState(
      {running: false,
       mode: Clock.defaultMode,
       sessionLength: Clock.defaultSessionLength,
       breakLength: Clock.defaultBreakLength
    });
    this.iniTimeLeft = Clock.defaultSessionLength*60*1000;
    this.timeLeft = this.iniTimeLeft;
    this.beepReset();
  }

  componentDidMount() {
    if (this.myInterval===null) {    // because react strict mode make it called twice
      this.myInterval = 
      setInterval(()=>{
        this.setState((prev) => {
          let currDate = Date.parse(Date());
          let timeDiff = currDate - this.startTime;
 
          if (prev.running) {
            this.timeLeft = this.iniTimeLeft - timeDiff;
            if (this.timeLeft <= 0) {
              this.beep();
              this.timeLeft = 0;
              //Switch Mode
              if (prev.mode === "session"){  // go to break mode
                this.startTime = currDate;
                this.iniTimeLeft = prev.breakLength*60*1000;
                this.timeLeft = this.iniTimeLeft; // default time left per ms
                return ({mode: "break"})
              } else {  // go to session mode
                this.startTime = currDate;
                this.iniTimeLeft = prev.sessionLength*60*1000;
                this.timeLeft = this.iniTimeLeft; // default time left per ms
                return ({mode:"session"})
              }
            } else return {prev}
          }  
        })
      },1000)
      //console.log("myInterval: " + this.myInterval);
    }
  }

  beep() {
    console.log("beep")
    const audio = document.getElementById("beep")
    audio.play();
    setTimeout(
      ()=>{audio.pause();
           audio.load();}
      ,1000);
  }

  beepReset(){
    const audio = document.getElementById("beep");
    audio.pause();
    audio.load();
  }

  render () {
    let timeLeftFormat = (Math.floor(this.timeLeft/60000)).toString().padStart(2,"0")+":"+
    ((this.timeLeft%60000)/1000).toString().padStart(2,"0")

    return (
    <div className="Absolute-Center">
      <link rel="stylesheet" 
       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
      <audio id="beep" preload="auto" 
       src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>

      <div id="clock">
        <div>25+5 Club</div>
        <div id="break-label">Break Length</div>
        <div id="break-length">{this.state.breakLength}</div>
        <i id="break-increment" className="fa-solid fa-chevron-up" onClick={this.handleBreakTime}></i>
        <i id="break-decrement" className="fa-solid fa-chevron-down" onClick={this.handleBreakTime}></i>

        <div id="session-label">Session Length</div>
        <div id="session-length">{this.state.sessionLength}</div>
        <i id="session-increment" className="fa-solid fa-chevron-up" onClick={this.handleSessionTime}></i>
        <i id="session-decrement" className="fa-solid fa-chevron-down" onClick={this.handleSessionTime}></i>
        

        <div id="timer-label">{this.state.mode}</div>
        <div id="time-left">{timeLeftFormat}</div>
        <i id="start_stop" className="fa-solid fa-play" onClick={this.handleStart}></i>
        <i className="fa-solid fa-pause"></i>
        <i id="reset" className="fa-solid fa-power-off" onClick={this.handleReset}></i>
      </div>
      <div id="signature">Coded by: Man Lok Lee</div>

    </div>
    );
  }
}

export default Clock;
