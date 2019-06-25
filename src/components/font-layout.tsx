import React from 'react';
import { SessionStore, FontControl } from "../components";
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