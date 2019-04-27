import React from "react"
import { ButtonLink, ButtonLinkRed, Form, Input, SEO, ObservableFunction } from "../components";

export default () => (
    <>
        <SEO title="Screen 2" />
        <h2>Screen 2!</h2>
        <Form>
            <label>
                Select your AIME
                <ObservableFunction cellname='AIMEPicked' widgetmax='5000'/>
            </label>
            
            <label>
                Select years of substantial earnings
                <ObservableFunction cellname='yearsSubstantialEarningsPicked' widgetmax='50'/>
            </label>
            <label>
                Enter amount of non-covered pension
                <Input />
            </label>
        </Form>
        <ButtonLinkRed to="/screen-1/">Go back!</ButtonLinkRed>
        <ButtonLink to="/screen-3/">Submit</ButtonLink>
    </>
);
