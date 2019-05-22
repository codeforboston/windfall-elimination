import React from "react";
import {
  ButtonLink,
  ButtonLinkRed,
  Form,
  Input,
  SEO,
  ObservableCell
} from "../components";

export default () => (
  <>
    <SEO title="Screen 2" />
    <h2>Screen 2!</h2>
    <Form>
      <label>
        Select your AIME
        <ObservableCell cellname="viewof AIMEPicked" />
      </label>
      <label>
        Select years of substantial earnings
        <ObservableCell cellname="viewof birthDatePicked" />
      </label>
      <label>
        Calculation display
        <ObservableCell cellname="viewof yearsSubstantialEarningsPicked" />
      </label>
      <label>
        <ObservableCell cellname="viewof pensionNonCoveredMonthly" />
      </label>
      <label>
        Enter amount of non-covered pension
        <ObservableCell cellname="viewof retireDatePicked" />
      </label>
      <label>
        Select years of substantial earnings
        <ObservableCell cellname="calculationDisplay" />
      </label>
    </Form>
    <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
    <ButtonLink to="/screen-3/">Submit</ButtonLink>
  </>
);
