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

export default () => (
  <>
    <SEO title="Pre-Screen" keywords={[`gatsby`, `application`, `react`]} />
    <h2>Background Information</h2>
    <TextBlock>
      To calculate your WEP-adjusted Benefit amount, we will need your
      assistance in providing relevant Social Security information.
    </TextBlock>
    <TextBlock>Before you begin, please provide the following:</TextBlock>
    <Card>
      <label>
        What year were you born?
        {/* <Input type="date"/> */}
        <ObservableCell cellname="viewof birthDatePicked" />
      </label>
      <div style={{ display: "none" }}>
        <ObservableCell cellname="calculationDisplay" />
      </div>

      <div>
        <ObservableCell cellname="viewof retireDatePicked" />{" "}
      </div>
      <HelperText>
        Because 62 is the earliest you can start to draw your Social Security
        retirement benefits, the SSA uses the year you turned 62 to calculate
        your benefits.
      </HelperText>
    </Card>
    <ButtonLinkRed to="/prescreen-1b/">Go back!</ButtonLinkRed>
    <ButtonLink to="/prescreen-2/">Start</ButtonLink>
  </>
);
