import React from "react";
// import {Runtime, Inspector} from "@observablehq/notebook-runtime";
// import notebook from "windfall-awareness-notebook-prototype";
import { ObservableContext } from "./observable-runtime";

export default class ObservableCell extends React.Component {
  /* Parent-Child context-sharing relationship between this and observable-runtime */
  static contextType = ObservableContext;

  constructor(props, context) {
      super(props, context);

      this.defaultRef = React.createRef();
   }


  componentDidMount() {
    this.context.registerCellRef(this.props.cellname, this.defaultRef.current)
  }

  componentWillUnmount() {
    this.context.resetCellRefs();
  }

  render() {
      return <div ref={this.defaultRef}></div>
  }

}
