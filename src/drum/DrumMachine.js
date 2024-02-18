import './DrumMachine.css';
import React from 'react'


class DrumMachine extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      drumkits: [
      {
       Q:{name:"Heater-1", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"},
       W:{name:"Heater-2", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"},
       E:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
       A:{name:"Heater-4", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"},
       S:{name:"Heater-6", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"},
       D:{name:"Dsc_Oh", url:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"},
       Z:{name:"Kick_n_Hat", url:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"},
       X:{name:"RP3_KICK_1", url:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"},
       C:{name:"Cev_H2", url:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}
      },
      {
        Q:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        W:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        E:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        A:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        S:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        D:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        Z:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        X:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"},
        C:{name:"Heater-3", url:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}
       }
      ],
      currKit: 0,
      display: "Let's Play"
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event){
    //const a = document.getElementsByClassName("pad")[0].firstChild;
    const audio = event.target.firstChild;
    audio.play();
    this.setState(
      {display: event.target.id}
    )
  }
  componentDidMount(){ 
      const currKit = this.state.drumkits[this.state.currKit]
      const padkeys = Object.keys(currKit);
      //console.log(drumKeys);

      const dm = document.getElementById("drum-machine")
      padkeys.map((padkey)=>{
 
        dm.addEventListener(
          "keydown", 
          (event) => {
            if (event.key.toUpperCase() === padkey) {
              const padname = currKit[padkey].name
              const audio = document.getElementById(padkey);
              //console.log(audio);
              audio.play();
              this.setState(
                {display: padname}
              )
            }
          }
        )
        return 0;
      });
      
      dm.focus();
  }

  render () {

    const pads = this.state.drumkits[this.state.currKit]
    const padComponents = Object.keys(pads).map((padkey) => {
      //console.log(padkey)
      const pad = pads[padkey]
      return ( 
        <div key={pad.name} id={pad.name} className="drum-pad" onClick={this.handleClick}>
        <audio id={padkey} className="clip" src={pad.url}/>
        {padkey}
        </div>
      )
    })
    return ( 
    <div id="drum-machine" tabIndex="0" className="Absolute-Center">
      <div id="machine">
        <div id="display">{this.state.display.toUpperCase()}</div> 
        <div id="drum-pads">
          {padComponents}
        </div>
      </div>
      <div id="signature">Coded by: Man Lok Lee</div>
    </div>
    );
  }
}

export default DrumMachine;
