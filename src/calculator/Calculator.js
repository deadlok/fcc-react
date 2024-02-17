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

  handleClick(event){
    this.setState( (state) => {  

      const btn = event.target.innerText;
      const btnIsOper = "+-*/".includes(btn);
      const display = state.display;
      const word = state.word;
      const wordLen = word.length;
      const wordLast = word.substring(wordLen-1);
      const wordIsOper = "+-*/".includes(word.substring(wordLen-1));

      // console.log('-------')
      // console.log("btn: '"+btn+"'")
      // console.log("word: '"+word+"'");
      // console.log("wordlast: '" + wordLast+"'");
      // console.log("workIsOper: " + wordIsOper);

      if (btn==="AC") {  // input "cancelled"
        //console.log("cancelled");
        return {
          display: "0",
          word: "0"
        }
      } else if(btn==="="){  // input "equal"
        let ans=eval(Math.round(eval(state.display)*10000)/10000).toString();
        return {
          display: ans,
          word: ans
        }
      } else if(btnIsOper) {  //input Operators
        if (!wordIsOper) {  //word is digit
          return {
            display: display + btn,
            word: btn
          }
        } else { // word is oper
          if (btn===wordLast) {
          } else {
            if (btn==="-") {  // press "-" operator
              return {
                display: display + btn,
                word: word + btn
              }
            } else {    // for "+,*,/" operator
              return {
                display: display.substring(0, display.length-wordLen) + btn,
                word: btn
              }
            }
          }
        }
      } else  {    // input digits
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

        if (valid === true) {
          //console.log("valid");
          if (wordIsOper) {
            //console.log('x');
            return {
              display: display + btn,
              word: btn
            }   
          } else if (word==="0" && btn!==".") {
            return {
              display: display.substring(0, display-1)+btn,
              word: btn
            }   
          } else {
            //console.log("normal")
            return {
              display: display + btn,
              word: word + btn
            }  
          } 
        } //if valid
      } //if (input)
    }) //setState
  } //handleClick

  render () {
    return (
    <div className="Absolute-Center">
      <div id="calculator" className="Absolute-Center">
        <div id="title">Calculator fx-001</div>
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
          <div id="clear" onClick={this.handleClick}>AC</div>
          <div id = "multiply" onClick={this.handleClick}>*</div>
          <div id = "divide" onClick={this.handleClick}>/</div>
          <div id = "add" onClick={this.handleClick}>+</div>
          <div id = "subtract" onClick={this.handleClick}>-</div>
          <div id="equals" onClick={this.handleClick}>=</div>
        </div>
      </div>
    </div>
    );
  }
}

export default Calculator;
