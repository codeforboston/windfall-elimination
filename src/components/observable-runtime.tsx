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
      
      this.observer = (dom) => {return new Inspector(dom)}
      
      this.state = {
        childrenCellRefs: [],
        runtimeState: {},
        allCells: [],
        allNamedCells: [],
        valueStore: {}
      };
   }


  componentDidMount() {
    this.main = generateRuntime(notebook);
    if (this.state.childrenCellRefs !== 0) {
      this.state.childrenCellRefs.map(this.generateDom)
    }
  }

  componentDidUpdate() {
    this.main = generateRuntime(notebook);
    if (this.state.childrenCellRefs !== 0) {
      this.state.childrenCellRefs.map(this.generateDom)
    }
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
    this.state.valueStore[cellName] = cellValue
  }

  render() {
      return <ObservableContext.Provider value={{
           registerCellRef: this.registerCellRef, 
           resetCellRefs: this.resetCellRefs,
           storeCellValues: this.storeCellValues
           }}>
         {this.props.children}
       </ObservableContext.Provider>
  }

}
