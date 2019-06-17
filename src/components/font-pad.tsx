import React from "react";
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";
import { FontControl } from "../components";


const FontButtonHolder = styled("div")`
  position: relative;
  top: 12px;
  right: -35px;
  margin-left: -200px;
  width: 150px;
  background: ${colors.darkGreen};
  border: 2px solid ${colors.black};
  color: ${colors.white};
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
  color: ${colors.black};
  border: 2px solid ${colors.black};
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
            <FontButton id="increase" onClick={this.checkDisable} disabled={this.state.IncDisable}>+</FontButton>
            <FontButton id="decrease" onClick={this.checkDisable} disabled={this.state.DecDisable}>-</FontButton>
          </div>
      </FontButtonHolder>
    </div>
      )
  }
}