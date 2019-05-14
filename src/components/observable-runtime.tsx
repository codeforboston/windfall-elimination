import React from "react";
import {Runtime, Inspector} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";
import { generateRuntime } from './generate-runtime';

export const ObservableContext = React.createContext();


export class ObservableRuntime extends React.Component {
  constructor(props, context) {
      super(props, context);
      
      this.storeCellValues = this.storeCellValues.bind(this);
      this.resetHTML = this.resetHTML.bind(this);
      
      //Generate Observable Notebook runtime object, this contains module namespace
      //premain() to prevent build error reference to window. 
      this.premain = () => {if (typeof window !== 'undefined') {return generateRuntime(notebook)}}
      this.main = this.premain()
      
      this.observer = (dom) => {return new Inspector(dom)}
      
      this.state = {
        valueStore: {},
        htmlList: {}
      };
   }

  storeCellValues(cellName, cellValue) {
      
    if (cellValue){
      this.state.htmlList[cellName] = cellValue.innerHTML;
    }

    if (cellValue) {
      var child = cellValue.children[0]
      if (child) {
        switch(child.tagName) {
          case 'FORM':
            return this.state.valueStore[cellName] = child.elements.input.value;

          case 'SPAN':
            return this.state.valueStore[cellName] = child.value;
        }
      }
      
    }
  }

  //Reset Observable Cell nodes to allow Observable Inspector to reinsert div.
  resetHTML(cellName, cellNode) {
    this.storeCellValues(cellName, cellNode)
    if (cellNode) {
        cellNode.innerHTML = this.state.htmlList[cellName]
      }
  }

  render() {
      return <ObservableContext.Provider value={{
           main: this.main,
           observer: this.observer,
           resetHTML: this.resetHTML
           }}>
         {this.props.children}
       </ObservableContext.Provider>
  }

}
