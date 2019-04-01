import React from "react"
import { ButtonLink, ButtonLinkRed, SEO } from "../components";

const Screen3 = () => (
    <>
        <SEO title="Screen 3" />
        <h2>Screen 3!</h2>
        <p>* WEP-Adjusted MPB</p>
        <p>PIA (slider)</p>
        <p>Visual formula walkthrough?</p>
        <ButtonLinkRed to="/screen-2/">Go back!</ButtonLinkRed>
        <ButtonLink to="/">Go Home</ButtonLink>
    </>
);

export default Screen3;
