import React from "react";
import {
  ButtonLink,
  ButtonLinkRed,
  TextBlock,
  SEO,
  UnorderedList,
  ListItem,
  TextBlockHeader,
  getWepTables,
  ObsFuncs
} from "../components";

export default class Prescreen1 extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.testFunc = this.testFunc.bind(this);
  }

  async testFunc(){
    console.log('here')
    console.log(getWepTables)
    var pia = await ObsFuncs.getWepMPB(3500, "1956-01-02", "2018-01-02", "2018", 20, 1)
    //var table = await getWepTables.bendPoints()
    console.log(pia)
  }

  render() {

    return(
      <>
        <SEO title="Prescreen 1" keywords={[`gatsby`, `application`, `react`]} />
        <h2>Pre-Screen</h2>

        <TextBlock>
            <strong>This app will:</strong>
            <UnorderedList>
              <ListItem>walk you through how the formula works</ListItem>
              <ListItem>help you estimate how WEP will affect you when you retire</ListItem>
              <ListItem>help you handle an overpayment</ListItem>
              <ListItem>give you some starting points to take political action</ListItem>
            </UnorderedList>
        </TextBlock>
        <button onClick={this.testFunc}>Test</button>
        <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-1b/">Start</ButtonLink>
    </>
    )
  }
}

