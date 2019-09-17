import React from "react";
import styled from "@emotion/styled";
import { colors, spacing, fontSizes, radii } from "../constants";
import { FontControl } from "../library/font-control";


const FontButtonHolder = styled("div")`
  position: relative;
  top: 12px;
  right: -35px;
  margin-left: -200px;
  width: 150px;
  background: ${colors.white};
  color: ${colors.black};
  font-size: ${fontSizes[1]};
  display: grid;
  justify-content: center;
  text-align: center;
`;

const FontButton= styled("div")`
  display: inline-block;
  text-align: center;
  width: 15px;
  padding: ${spacing[0]} ${spacing[1]};
  background-color: ${colors.white};
  color: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 50%;
  &:hover {
        border-color: ${colors.lime};
        background-color: ${colors.lime};
        color: ${colors.white}
  }

  pointer-events: ${props => props.disabled ? "none" : "false"};

`;

const FontButtonLeft= styled("div")`
  display: inline-block;
  text-align: center;
  width: 15px;
  padding: ${spacing[0]} ${spacing[1]};
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.black};
  border-radius: 1.5em 0 0 1.5em;
  padding-left: 1em;
  &:hover {
        border-color: ${colors.lime};
        background-color: ${colors.lime};
        color: ${colors.white}
  }

  pointer-events: ${props => props.disabled ? "none" : "false"};

`;

const FontButtonRight= styled("div")`
  display: inline-block;
  text-align: center;
  width: 15px;
  padding: ${spacing[0]} ${spacing[1]};
  background-color: ${colors.white};
  color: ${colors.black};
  border: 2px solid ${colors.black};
  border-radius: 0 1.5em 1.5em 0;
  padding-right: 1em;
  &:hover {
        border-color: ${colors.lime};
        background-color: ${colors.lime};
        color: ${colors.white}
  }

  pointer-events: ${props => props.disabled ? "none" : "false"};

`;

export default class FontPad extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.checkDisable = this.checkDisable.bind(this);
    this.state = {
      IncDisable: false,
      DecDisable: false
    }
  }

  checkDisable(e) {
    FontControl.setFont(e)
    if (FontControl.getFontSize() === fontSizes[0]) {
      this.setState({
        DecDisable: true
      })
    } else if (FontControl.getFontSize() === fontSizes[3]) {
      this.setState({
        IncDisable: true
      })
    } else {
      this.setState({
        IncDisable: false,
        DecDisable: false
      })
    }
  }

  render() {
    return(
      <div style={{ float: "right" }}>
      <FontButtonHolder>
          Font Size
          <div style={{ display: "block"}}>
            <FontButtonLeft id="decrease" onClick={this.checkDisable} disabled={this.state.DecDisable}>-</FontButtonLeft>
            <FontButtonRight id="increase" onClick={this.checkDisable} disabled={this.state.IncDisable}>+</FontButtonRight>
          </div>
      </FontButtonHolder>
    </div>
      )
  }
}
