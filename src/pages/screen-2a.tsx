import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../constants";
import { SessionStore } from "../library/session-store";
import dayjs from "dayjs";
import {
  TextBlock,
  SEO,
  Card,
  H2,
} from "../components";

const H4 = styled.h4`
margin: 5px 0;
`

export default class Prescreen1c extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
    };
  }


    render() {
        return (
            <div>
                <SEO title="Pre-Screen 2a" keywords={[`gatsby`, `application`, `react`]} />
                <H2>Benefit Formula</H2>
                <TextBlock>
                </TextBlock>
                  <Card>
                  <html><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSFm_RBR4EWvsc7sKfX0CNwgxN7d1h_u0Ui9zxX58Ay7t9AWc9lRJDmNweQPD4V5AsL9Ea5u8rqZ6Nf/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></html>
                  </Card>
            </div>
         )
    }
}
