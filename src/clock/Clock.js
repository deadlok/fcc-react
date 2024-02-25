import './Clock.css';
import React from 'react'

class Clock extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      timeLeft: Clock.defaultSessionLength*60*1000,
      breakLength: Clock.defaultBreakLength,
      sessionLength: Clock.defaultSessionLength,
      mode: Clock.defaultMode,
      running: false,
      finished: false
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
  myInterval = 0;  // my running period handler
  iniTimeLeft = Clock.defaultSessionLength*60*1000;
  

  handleSessionTime(event){
    if (!this.state.running){
      this.setState((prev) => {
        let newValue = prev.sessionLength
        if (event.target.id === "session-increment") newValue += 1;
        else if (event.target.id === "session-decrement") newValue -= 1;
  
        if (newValue>0 && newValue <=60) {
          if (prev.mode==="session"){
            this.iniTimeLeft = newValue*60*1000;
            return ({timeLeft: this.iniTimeLeft,
                     sessionLength: newValue})
          } else {
            return {sessionLength: newValue};
          }
        } else return prev;
      })
    }
  }

  handleBreakTime(event){
    if (!this.state.running){
      this.setState((prev) => {
        let newValue = prev.breakLength
        if (event.target.id === "break-increment") newValue += 1;
        else if (event.target.id === "break-decrement") newValue -= 1;
  
        if (newValue>0 && newValue <=60) {
          if (prev.mode==="break"){
            this.iniTimeLeft = newValue*60*1000;
            return ({timeLeft: this.iniTimeLeft,
                     breakLength: newValue})
          } else {
            return {breakLength: newValue};
          }
        } else return prev;
      })
    }
  }

  handleStart(event){   //Start or Pause
    if (this.state.running) {
      console.log("Pause");
    } else {
      console.log("Start");
      this.iniTimeLeft = this.state.timeLeft
      this.startTime = Date.parse(Date());
      this.startTimer(); 
    }
    this.setState((prev)=> 
      ({running:!prev.running}));
  }

  handleReset(event){
    console.log("Reset");
    this.iniTimeLeft = Clock.defaultSessionLength*60*1000;
    this.setState(
      {timeLeft: this.iniTimeLeft,
       running: false,
       mode: Clock.defaultMode,
       sessionLength: Clock.defaultSessionLength,
       breakLength: Clock.defaultBreakLength
    });
    this.stopTimer();
    this.beepReset();
  }

  startTimer () {
    if (this.myInterval===0) {    // because react strict mode make it called twice
      console.log("start timer")
      this.myInterval = 
      setInterval(()=>{
        console.log("tick-tack");
        this.setState((prev)=>{
          if (prev.running) {
            let timeDiff = (Date.parse(Date()) - this.startTime);
            let timeLeft = this.iniTimeLeft - timeDiff;
            if (timeLeft <= 0) {
              timeLeft = 0;
              this.stopTimer();
            }
            return({timeLeft: timeLeft});
          } else {
            return prev;
          }
        })
      },1000)
      console.log("myInterval: " + this.myInterval);
    }
  }

  stopTimer() { 
    console.log(this.myInterval); 
    if (this.myInterval > 0) {
      console.log("stop timer"); 
       //clear all because some unexpected instance have been created by server
      for (let i=0;i<10000;i++){
        clearInterval(i);
      }
      this.myInterval = 0;
    }
  }

  componentDidUpdate(){
    if (this.state.running && this.state.timeLeft === 0) {
      if (this.state.finished===true) {
        console.log("finished")
        this.beep();
        //Switch Mode
        this.setState((state)=>{
          if (state.mode === "session"){  // go to break mode
            this.startTime = Date.parse(Date());
            this.iniTimeLeft = state.breakLength*60*1000;
            return ({mode: "break",
                    timeLeft: this.iniTimeLeft,
                    running: true,
                    finished: false
            })
          } else {  // go to session mode
            this.startTime = Date.parse(Date());
            this.iniTimeLeft = state.sessionLength*60*1000;
            return ({mode:"session",
                    timeLeft: this.iniTimeLeft,
                    running: true,
                    finished: false
            })
          }
        })
        this.startTimer();
      } else {
        //delayed so that 00:00 will be displayed for 1s
        setTimeout(()=>{
          this.setState({finished: true});
        },1000)
      }
      //console.log(this.timeLeft);
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
    let timeLeft= this.state.timeLeft
    let minutes = Math.floor(timeLeft/60000)
    let seconds = (timeLeft%60000)/1000
    let timeLeftFormat = minutes.toString().padStart(2,"0")+":"
                         +seconds.toString().padStart(2,"0")
    let timeClass = null;
    if (minutes === 0) timeClass="font-red";
  
    return (
    <div className="Absolute-Center">
      <link rel="stylesheet" 
       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
      <audio id="beep" preload="auto" 
       src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>

      <div id="clock">

        <div><h1>25+5 Clock</h1></div>

        <div id="timer">
          <div id="timer-label">{this.state.mode}</div>
          <div id="time-left" className={timeClass}>{timeLeftFormat}</div>
        </div>

        <div id="ctrl-panel">
          <div id="break-block">
            <div id="break-label">Break Length</div>
            <div id="break-length">{this.state.breakLength}</div>
            <i id="break-increment" className="fa-solid fa-chevron-up" onClick={this.handleBreakTime}></i>
            <i id="break-decrement" className="fa-solid fa-chevron-down" onClick={this.handleBreakTime}></i>
          </div>

          <div id="session-block">
            <div id="session-label">Session Length</div>
            <div id="session-length">{this.state.sessionLength}</div>
            <i id="session-increment" className="fa-solid fa-chevron-up" onClick={this.handleSessionTime}></i>
            <i id="session-decrement" className="fa-solid fa-chevron-down" onClick={this.handleSessionTime}></i>
          </div>

          <i id="start_stop" 
          className={this.state.running?"fa-solid fa-pause":"fa-solid fa-play"}
          onClick={this.handleStart}></i>
          <i id="reset" className="fa-solid fa-power-off" onClick={this.handleReset}></i>
        </div>
      </div>
      <div id="signature">Coded by: Man Lok Lee</div>
    </div>
    );
  }
}
export default Clock;
