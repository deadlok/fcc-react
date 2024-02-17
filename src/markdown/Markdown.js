import './Markdown.css';
import React from 'react'
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


class Markdown extends React.Component {
  constructor(props){
    super(props);

    let rawStr = 
`
# Welcome to my React Markdown Previewer!
    
## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

    //console.log(marked.parse(rawStr))

    this.state = {
      input: rawStr,
      markdown: marked.parse(rawStr,{breaks:true})
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    //console.log(event.target.value);

    this.setState({input: event.target.value,
                  markdown: marked.parse(event.target.value,{breaks:true})});

    //console.log(this.state);
  }
  render () {
    return ( 
    <div className="Markdown">
      <div className="editorWrap">
      <textarea id="editor" rows="20" cols="80" value ={this.state.input} onChange={this.handleChange}>
      </textarea>
      </div>
      <div id="preview" className="previewWrap" dangerouslySetInnerHTML={{__html: this.state.markdown}}>
      </div>
    </div>
    );
  }
}

export default Markdown;
