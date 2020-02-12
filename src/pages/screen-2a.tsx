import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextBlock,
  SEO,
  Card,
  H2,
} from "../components";


export default class Screen2a extends React.Component {
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
