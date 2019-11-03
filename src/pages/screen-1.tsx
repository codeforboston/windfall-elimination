import React from "react"
import { ButtonLink, ButtonLinkRed, Form, SEO, ObservableCell, Card, Message } from "../components";

export default () => (
    <>
        <SEO title="Pension Adjustment" />
        <h2>Step 4: WEP-Adjusted Benefits</h2>
        <Form>
          <Card>
            <label>
            <h3>Low-Pension Guarantee</h3>
            Enter the amount of your noncovered pension:
                <ObservableCell cellname='viewof pensionNonCoveredMonthly'/>
            </label>
          </Card>
        </Form>
        <ButtonLinkRed to="/prescreen-1b/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-2/">Submit</ButtonLink>
    </>
);
