import React from "react"
import { ButtonLink, ButtonLinkRed, Form, Input, SEO } from "../components";

const Screen2 = () => (
    <>
        <SEO title="Screen 2" />
        <h2>Screen 2!</h2>
        <p>* Calculated AIME</p>
        <Form>
            <label>
                Enter # of years of substantial earnings
                <Input />
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

export default Screen2;
