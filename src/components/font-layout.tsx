import React from 'react';
import { SessionStore } from "../library/session-store";
import { FontControl } from "../library/font-control";
import { fontSizes } from "../constants";



export default class FontLayout extends React.Component {

  componentDidMount() {
  	FontControl.loadFont()
  }

  componentDidUpdate() {
  	FontControl.loadFont()
  }

  render() {
    return <>{this.props.children}</>
  }
}