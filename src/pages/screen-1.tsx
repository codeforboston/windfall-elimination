import React from "react"
import { ButtonLink, ButtonLinkRed, Form, SEO, ObservableCell, Card, Message } from "../components";

export default () => (
    <>
        <SEO title="Screen 2" />
        <h2>Step 3: WEP-Adjusted Benefits</h2>
        <Form>
          <Card>
            <label>
            <h3>Low-Pension Guarantee</h3>
            Enter the amount of your noncovered pension:
                <ObservableCell cellname='viewof pensionNonCoveredMonthly'/>
            </label>
          </Card>
        </Form>
        <ButtonLinkRed to="/prescreen-2/">Go back!</ButtonLinkRed>
        <ButtonLink to="/prescreen-1b/">Submit</ButtonLink>
    </>
);
