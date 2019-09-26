import React from "react";
import {
  ButtonLinkGreen,
  ButtonLink,
  TextBlock,
  SEO,
  UnorderedList,
  ListItem,
} from "../components";

export default class Prescreen1 extends React.Component {
  render() {
    return(
      <>
        <SEO title="Prescreen 1" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Pre-Screen</h2>

    <TextBlock>
      <strong>This app will:</strong>
      <UnorderedList>
        <ListItem>walk you through how the formula works</ListItem>
        <ListItem>
          help you estimate how WEP will affect you when you retire
        </ListItem>
        <ListItem>help you handle an overpayment</ListItem>
        <ListItem>
          give you some starting points to take political action
        </ListItem>
      </UnorderedList>
    </TextBlock>
    <ButtonLinkGreen to="/">Go back!</ButtonLinkGreen>
    <ButtonLink to="/prescreen-1b/">Start</ButtonLink>
  </>
  )
 }
}