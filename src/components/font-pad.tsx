import React from "react";
import styled from "@emotion/styled";
import { colors, spacing, fontSizes, lightGray } from "../constants";


const FontButtonHolder = styled("div")`
  float: right;
  display:block;
  top: 12px;
  right: -35px;
  margin-left: -200px;
  width: 150px;
  display: grid;
  justify-content: center;
  text-align: center;
`;
const Text = styled.h4`
  color: ${colors.white};
  font-size: ${fontSizes[1]};
  margin: 0;
`

const FontButton= styled("div")`
  display: inline-block;
  text-align: center;
  width: 15px;
  padding: ${spacing[0]} ${spacing[1]};
  font-weight: 800;
  background-color: ${colors.white};
  color: ${colors.white};
  border: 1px solid ${colors.black};
  border-radius: 50%;
  &:hover {
        border-color: ${colors.darkBlue};
        background-color: ${colors.lightGray};
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
  border-radius: 1.5em 0 0 1.5em;
  padding-left: 1em;
  box-shadow: 0px 2px 4px #000000;
  font-weight: 800;
  &:hover {
        border-color: ${colors.darkBlue};
        background-color: ${colors.lightGray};
        color: ${colors.black}
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
  border-radius: 0 1.5em 1.5em 0;
  padding-right: 1em;
  box-shadow: 0px 2px 4px #000000;
  &:hover {
        border-color: ${colors.darkBlue};
        background-color: ${colors.lightGray};
        color: ${colors.black}
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
      <FontButtonHolder>
          <Text>Font Size</Text>
          <div>
            <FontButtonLeft id="decrease" onClick={this.checkDisable} disabled={this.state.DecDisable}>-</FontButtonLeft>
            <FontButtonRight id="increase" onClick={this.checkDisable} disabled={this.state.IncDisable}>+</FontButtonRight>
          </div>
      </FontButtonHolder>
      )
  }
}
