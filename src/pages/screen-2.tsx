import React from "react"
import { ButtonLink, ButtonLinkRed, Form, SEO, ObservableCell, Card, Message } from "../components";

export default () => (
    <>
        <SEO title="Screen 2" />
        <h2>WEP-Adjusted Benefits</h2>
        <Form>
        <Card>
            <h3>Your Retirement</h3>
            <label>
                Averaged Indexed Monthly Earnings (AIME)
                <ObservableCell cellname='AIMEPicked'/>
            </label>
            <label>
                Birthdate
                <ObservableCell cellname='birthDatePicked' />
            </label>
            <label>
               Retirement Date
                <ObservableCell cellname='retireDatePicked'/>            
            </label>
            <label>
                Years of Substantial Earnings
                <ObservableCell cellname='yearsSubstantialEarningsPicked' />
            </label>
            <label>
            <h3>Low-Pension Guarantee</h3>
            Enter the amount of your noncovered pension:
                <ObservableCell cellname='viewof pensionNonCoveredMonthly'/>
            </label>
         </Card>
            <Message>
                <label>
                    <h2>Results</h2>
                    <ObservableCell cellname='calculationDisplay' />
                </label>
            </Message>
        </Form>
        <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-3/">Submit</ButtonLink>
    </>
);
