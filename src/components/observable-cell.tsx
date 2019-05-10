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
    this.domEl = this.defaultRef.current
    this.context.registerCellRef(this.props.cellname, this.defaultRef.current)
  }

  componentWillUnmount() {
    var child = this.domEl.children[0]
    if (child) {
      switch(child.tagName) {
        case 'FORM':
          return this.context.storeCellValues(this.props.cellname, child.elements.input.value);

        case 'SPAN':
          return this.context.storeCellValues(this.props.cellname, child.value);
      }
    }


  }

  render() {
      return <div key={this.props.cellname} ref={this.defaultRef}></div>
  }

}
