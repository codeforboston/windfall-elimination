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
                <h2>Step 1: Background Information</h2>
                <TextBlock>
                    To calculate your Social Security benefit, please input the following dates.
                </TextBlock>
                <Card>
                        <label>
                            {/* <Input type="date"/> */}
                            <ObservableCell cellname='viewof birthDatePicked' />
                        </label>
                        <div style={{display: 'none'}}><ObservableCell cellname='calculationDisplay' /></div>

                        <div><ObservableCell cellname='viewof retireDatePicked'/> </div>
                </Card>
                <ButtonLinkRed to="/">Go back!</ButtonLinkRed>
                <ButtonLink to="/prescreen-2/">Start</ButtonLink>
            </>
         )
    }
}
