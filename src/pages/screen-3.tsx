import React from "react"
<<<<<<< HEAD
import { ButtonLink, ButtonLinkRed, SEO, ObservableFunction, ObservableDock  } from "../components";
=======
import { ButtonLink, ButtonLinkRed, SEO, Form, Input,ObservableCell } from "../components";
>>>>>>> otherrep/master

export default () => (
    <>
        <SEO title="Screen 3" />
        <h2>Screen 3!</h2>
        <p>* WEP-Adjusted MPB</p>
        <ObservableDock />
        <p>PIA (slider)</p>
        <label>
                Select years of substantial earnings
                <ObservableCell cellname='viewof yearsSubstantialEarningsPicked' />
            </label>
            <label>
                Enter amount of non-covered pension
                <Input />
            </label>
            <label>
                Select years of substantial earnings
                <ObservableCell cellname='calculationDisplay'/>
                </label>
        <p>Visual formula walkthrough?</p>
        <ButtonLinkRed to="/screen-2/">Go back!</ButtonLinkRed>
        <ButtonLink to="/">Go Home</ButtonLink>
    </>
);
