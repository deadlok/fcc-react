import './Calculator.css';
import React from 'react'

class Calculator extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      display:"0",
      word:"0",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  updateState = (display, word) => {
    //console.log('changing state');
     this.setState({
       display: display,
       word: word
     },() => { console.log('new state', this.state); })
   }

  handleClick(event){
    //console.log(event.target.innerText);
    const btn = event.target.innerText;
    const btnIsOper = "+-*/".includes(btn);
    const display = this.state.display;
    const word = this.state.word;
    const wordLen = word.length;
    const wordLast = word.substring(wordLen-1);
    const wordIsOper = "+-*/".includes(word.substring(wordLen-1));

    console.log('-------')
    console.log("btn: '"+btn+"'")
    console.log("word: '"+word+"'");
    console.log("wordlast: '" + wordLast+"'");
    console.log("workIsOper: " + wordIsOper);

    if (btn==="AC") {
      this.updateState("0","0");
      console.log("cancelled");

    } else if(btn==="="){ 
      let ans=eval(this.state.display).toString();
      this.updateState(ans, ans);     

    } else if(btnIsOper) {  //input is operator
        if (!wordIsOper) {  //word is digit
          this.updateState(display + btn, btn);
        } else { // word is oper
          if (btn===wordLast) {
          } else {
            if (btn==="-") {  // for - operator
              this.updateState(display+btn, word+btn);
            } else {    // for +,*,/ operator
              this.updateState(display.substring(0, display.length-wordLen) + btn, btn)
            }
          }
        }
    } else  {    // digit
        let valid = true;

        if (btn===".") {
          if (word.includes(".") || wordIsOper){
            valid = false;
          }
        } else if (btn==="0") {
          if (word ==="0") {
            valid = false;
          }
        }

        //console.log(valid);
        if (valid === true) {

            if (wordIsOper) {
              //console.log('x');
              this.updateState(display+btn,btn);    
            } else if (word==="0" && btn!==".") {
              //console.log('y');
              this.updateState(display.substring(0, display-1)+btn, btn)     
            } else {
              //console.log('z');
              this.updateState(display+btn, word+btn);
            } 
        } 
    }
  }

  render () {
    return ( 
    <div id="calculator" className="Absolute-Center">
      <div id="display">{this.state.display}</div>
      <div id="digitpad">
        <div id="seven" onClick={this.handleClick}>7</div>
        <div id="eight" onClick={this.handleClick}>8</div>
        <div id="nine" onClick={this.handleClick}>9</div>
        <div id="four" onClick={this.handleClick}>4</div>
        <div id="five" onClick={this.handleClick}>5</div>
        <div id="six" onClick={this.handleClick}>6</div>
        <div id="one" onClick={this.handleClick}>1</div>
        <div id="two" onClick={this.handleClick}>2</div>
        <div id="three" onClick={this.handleClick}>3</div>
        <div id="zero" onClick={this.handleClick}>0</div>
        <div id="decimal" onClick={this.handleClick}>.</div>
      </div>
      <div id="operator">
        <div id = "add" onClick={this.handleClick}>+</div>
        <div id = "subtract" onClick={this.handleClick}>-</div>
        <div id = "multiply" onClick={this.handleClick}>*</div>
        <div id = "divide" onClick={this.handleClick}>/</div>
        <div id="clear" onClick={this.handleClick}>AC</div>
        <div id="equals" onClick={this.handleClick}>=</div>
      </div>
    </div>
    );
  }
}

export default Calculator;
