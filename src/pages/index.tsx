import React, {Component} from "react";
import { Link } from "gatsby"
import { LinkWrapper, SEO, ButtonLink } from "../components";

import {Runtime, Inspector} from "@observablehq/notebook-runtime";
// import notebook from "how-to-embed-a-notebook-in-a-react-app";
import notebook from "windfall-awareness-notebook-prototype";

export default class App extends Component {

    //explanation: https://observablehq.com/@observablehq/how-to-embed-a-notebook-in-a-react-app
    birthdateRef = React.createRef();
    birthDatePickedPickerRef = React.createRef();

    calculationDisplayRef = React.createRef();
  
    componentDidMount() {
      Runtime.load(notebook, (cell) => {
        if (cell.name === "birthDatePicked") {
          return new Inspector(this.birthdateRef.current);
        }
        if (cell.name === "viewof birthDatePicked") {
            return new Inspector(this.birthDatePickedPickerRef.current);
          }
        if (cell.name === "calculationDisplay") {
            return new Inspector(this.calculationDisplayRef.current);
          }
       });
    }
  
    render() {
      return (
        <>
             <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <h2>Windfall Elimination Awareness Demo</h2>
            <p>This is a demo of the Windfall Elimination Project.<br/>Check out our demo or the admin page!</p>
            <LinkWrapper>
                <ButtonLink to="/prescreen-1/">Demo</ButtonLink>
                <Link to="/admin/">Admin</Link>
                <a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a>
            </LinkWrapper>
            <p>
                <div ref={this.birthdateRef}></div>
                <div ref={this.birthDatePickedPickerRef}></div>
                <div ref={this.calculationDisplayRef}></div>
            </p> 
        </>
      );
    }
  }
