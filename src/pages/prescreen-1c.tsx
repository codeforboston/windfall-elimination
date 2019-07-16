import React from "react";
import {
  ButtonLink,
  ButtonLinkRed,
  TextBlock,
  SEO,
  ListText,
  LinkButton,
  Card,
  ObservableCell,
  HelperText
} from "../components";

export default class Prescreen1c extends React.Component {

    render() {
        return (
            <>
                <SEO title="Pre-Screen" keywords={[`gatsby`, `application`, `react`]} />
                <h2>Background Information</h2>
                <TextBlock>
                    To calculate your WEP-adjusted retirement benefit, we will need your
                    assistance in providing relevant Social Security information.
                </TextBlock>
                <TextBlock>
                    Before you begin, please provide the following:
                </TextBlock>
                <Card>
                        <label>
                            What year were you born?
                            {/* <Input type="date"/> */}
                            <ObservableCell cellname='viewof birthDatePicked' />
                        </label>
                        <div style={{display: 'none'}}><ObservableCell cellname='calculationDisplay' /></div>

                        <div><ObservableCell cellname='viewof retireDatePicked'/> </div>
                </Card>
                <ButtonLinkRed to="/prescreen-1b/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-2/">Start</ButtonLink>
            </>
         )
    }
}
