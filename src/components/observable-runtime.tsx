import React from "react";
import {Runtime, Inspector} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";
import { node } from "prop-types";
import { generateRuntime } from './observable-dock';

export const ObservableContext = React.createContext();


export class ObservableRuntime extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.registerCellRef = this.registerCellRef.bind(this);
      this.resetCellRefs = this.resetCellRefs.bind(this);
      this.storeCellValues = this.storeCellValues.bind(this);
      this.generateDom = this.generateDom.bind(this);
      this.resetHTML = this.resetHTML.bind(this);
      this.premain = () => {if (typeof window !== 'undefined') {console.log(window); return generateRuntime(notebook)}}
      this.main = this.premain()
      
      this.observer = (dom) => {return new Inspector(dom)}
      
      this.state = {
        runtime: '',
        childrenCellRefs: [],
        runtimeState: {},
        allCells: [],
        allNamedCells: [],
        valueStore: {},
        htmlList: {}
      };
   }

  generateDom(cell) {
    this.state.allCells.push(cell)
    this.main.variable(this.observer(cell.domRef)).define([cell.cellName], widget => widget)
  }

  registerCellRef(cellName, domRef) {
    this.state.childrenCellRefs.push({cellName, domRef})
  }

  resetCellRefs() {
    this.state.childrenCellRefs = []
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

  resetHTML(cellName, cellNode) {
    
    this.storeCellValues(cellName, cellNode)
    if (cellNode) {
        cellNode.innerHTML = this.state.htmlList[cellName]
      }
  }

  render() {
      return <ObservableContext.Provider value={{
           registerCellRef: this.registerCellRef, 
           resetCellRefs: this.resetCellRefs,
           runtime: this.state.runtime,
           testmain: this.main,
           observer: this.observer,
           resetHTML: this.resetHTML
           }}>
         {this.props.children}
       </ObservableContext.Provider>
  }

}
