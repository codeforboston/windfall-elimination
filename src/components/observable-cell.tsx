import React from "react";
// import {Runtime, Inspector} from "@observablehq/notebook-runtime";
// import notebook from "windfall-awareness-notebook-prototype";
import { ObservableContext } from "./observable-runtime";

export default class ObservableCell extends React.Component {
  /* Parent-Child context-sharing relationship between this and observable-runtime */
  static contextType = ObservableContext;

  constructor(props, context) {
      super(props, context);
      this.domEl = '';
      this.defaultRef = React.createRef();
   }


  componentDidMount() {
    var newmain = this.context.testmain
    this.context.resetHTML()
    newmain.variable(this.context.observer(this.defaultRef.current)).define([this.props.cellname], widget => widget)
    
    this.domEl = this.defaultRef.current
    //this.context.registerCellRef(this.props.cellname, this.defaultRef.current)
    
  }

  componentWillUnmount() {
    this.context.resetHTML(this.props.cellname, this.defaultRef.current)
  }

  render() {
    
      return <div id={this.props.cellname} ref={this.defaultRef}></div>
  }

}
